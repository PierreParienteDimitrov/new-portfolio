#!/usr/bin/env node
/**
 * Publish LightCraft albums to the website.
 *
 *   npm run photos:init                 list LightCraft's albums in photos.config.json
 *                                       (new albums are added as private; your choices are kept)
 *   npm run photos:publish -- --local   render the public albums into public/photo-files (for npm run dev)
 *   npm run photos:publish              render, then upload new files to Cloudflare R2
 *   add --prune                         also delete files no photo uses any more (cache and R2)
 *   add --connect                       talk to the running LightCraft app (started with --control 7980)
 *                                       instead of opening the library headless (needs LightCraft closed;
 *                                       only when every public album is in the library the app has open)
 *
 * photos.config.json lists one or more LightCraft libraries in "libraries"; each album records the
 * library it comes from in "library" (photo ids are only unique within one library).
 *
 * What it does, per public album photo:
 *   1. asks LightCraft for the photo's develop settings; the photo's key is a hash of the source file,
 *      those settings and the output options, so a photo is only rendered again after you edit it;
 *   2. exports the edited photo from LightCraft (sRGB, screen sharpening, no metadata);
 *   3. makes WebP files at each width in photos.config.json with sharp (metadata, including GPS, is
 *      not copied) into public/photo-files/photos/<key>/<width>.webp;
 *   4. writes src/data/photos.json, which the site reads at build time;
 *   5. without --local, uploads the files R2 doesn't have yet (immutable, cached for a year).
 *
 * R2 credentials come from the environment or .env.local:
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET
 */
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG_PATH = path.join(ROOT, "photos.config.json");
const MANIFEST_PATH = path.join(ROOT, "src/data/photos.json");
const CACHE_DIR = path.join(ROOT, "public/photo-files");
const PREFIX = "photos";
const ENCODER_VERSION = 1; // bump to re-render every photo (e.g. after changing the sharp options)
const EXPORT_BATCH = 16;

const args = process.argv.slice(2);
const command = args[0];
const flag = (name) => args.includes(`--${name}`);

for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(path.join(ROOT, file));
  } catch {
    /* no such file */
  }
}

// ---------------------------------------------------------------- LightCraft

function lightcraftCli() {
  if (process.env.LIGHTCRAFT_CLI) return process.env.LIGHTCRAFT_CLI;
  const local = path.join(os.homedir(), ".local/bin/lightcraft-cli");
  return fs.existsSync(local) ? local : "lightcraft-cli";
}

function expandHome(p) {
  return p.startsWith("~/") ? path.join(os.homedir(), p.slice(2)) : p;
}

/** Runs LightCraft commands on one library in one process; resolves with one {ok, result, error} per command. */
function runLightCraft(library, commands, onLine) {
  const scriptFile = path.join(os.tmpdir(), `lightcraft-${process.pid}-${Date.now()}.jsonl`);
  fs.writeFileSync(scriptFile, commands.map((c) => JSON.stringify(c)).join("\n") + "\n");
  const target = flag("connect") ? ["--connect"] : ["--library", expandHome(library)];
  return new Promise((resolve, reject) => {
    const child = spawn(lightcraftCli(), ["run", ...target, "--keep-going", "--script", scriptFile], {
      stdio: ["ignore", "pipe", "pipe"],
    });
    const replies = [];
    let buffer = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      buffer += chunk;
      let nl;
      while ((nl = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!line.startsWith("{")) continue;
        const reply = JSON.parse(line);
        replies.push(reply);
        onLine?.(reply, replies.length);
      }
    });
    child.stderr.on("data", (chunk) => (stderr += chunk));
    child.on("error", (err) =>
      reject(new Error(`Could not start lightcraft-cli (${err.message}). Set LIGHTCRAFT_CLI to its path.`)),
    );
    child.on("close", () => {
      fs.rmSync(scriptFile, { force: true });
      if (replies.length < commands.length) {
        const hint = /lock|in use|already open/i.test(stderr)
          ? "\nThe library is open in LightCraft: quit the app, or run with --connect while it runs with --control 7980."
          : "";
        reject(new Error(`LightCraft stopped after ${replies.length}/${commands.length} commands.\n${stderr.trim()}${hint}`));
      } else resolve(replies);
    });
  });
}

function must(reply, what) {
  if (!reply?.ok) throw new Error(`LightCraft ${what} failed: ${JSON.stringify(reply?.error ?? reply)}`);
  return reply.result;
}

// ---------------------------------------------------------------- helpers

function readConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error("photos.config.json is missing: run `npm run photos:init` first.");
  }
  return normalizeConfig(JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8")));
}

/** Older configs had a single "library"; albums without one belong to the first library. */
function normalizeConfig(config) {
  const { library, ...rest } = config;
  const libraries = rest.libraries ?? (library ? [library] : []);
  if (!libraries.length) throw new Error('photos.config.json lists no "libraries".');
  return { libraries, ...rest, albums: rest.albums.map((a) => ({ ...a, library: a.library ?? libraries[0] })) };
}

/** Where an album entry was found: its library and name. */
const albumRef = (library, name) => JSON.stringify([library, name]);

/** Every album with photos, in every library: [{library, id, name, count, cover, …}]. */
async function listAlbums(config) {
  const out = [];
  for (const library of config.libraries) {
    const [reply] = await runLightCraft(library, [{ command: "albums.list", params: {} }]);
    for (const a of flattenAlbums(must(reply, `albums.list in ${library}`))) out.push({ ...a, library });
  }
  return out;
}

function slugify(name) {
  return name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function flattenAlbums(nodes, out = []) {
  for (const node of nodes) {
    if (!node.folder) out.push(node);
    if (node.children?.length) flattenAlbums(node.children, out);
  }
  return out;
}

/** Runs one command per item, each on its item's library; replies come back in item order. */
async function runPerLibrary(items, toCommand) {
  const replies = new Array(items.length);
  for (const library of new Set(items.map((x) => x.library))) {
    const idx = items.flatMap((x, i) => (x.library === library ? [i] : []));
    const got = await runLightCraft(library, idx.map((i) => toCommand(items[i])));
    idx.forEach((i, j) => (replies[i] = got[j]));
  }
  return replies;
}

/** The photos of each album; each photo carries its library. */
async function albumPhotos(albums) {
  const replies = await runPerLibrary(albums, (a) => ({
    command: "catalog.query",
    params: { filter: { album: a.id }, limit: 5000 },
  }));
  return replies.map((r, i) =>
    must(r, `query of "${albums[i].name}"`)
      .photos.filter((p) => !p.deleted && p.kind === "image")
      .map((p) => ({ ...p, library: albums[i].library })),
  );
}

function progress(label, done, total) {
  process.stdout.write(`\r${label} ${done}/${total}${done === total ? "\n" : ""}`);
}

async function mapLimit(items, limit, fn) {
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      await fn(items[i], i);
    }
  });
  await Promise.all(workers);
}

// ---------------------------------------------------------------- init

async function init() {
  const existing = fs.existsSync(CONFIG_PATH) ? readConfig() : null;
  const config = existing ?? {
    libraries: ["~/Pictures/LightCraft Photos"],
    widths: [640, 1280, 1920, 2560],
    quality: 82,
    albums: [],
  };
  const albums = (await listAlbums(config)).filter((a) => a.count > 0);
  const photos = await albumPhotos(albums);
  const latest = new Map(
    albums.map((a, i) => [albumRef(a.library, a.name), photos[i].map((p) => p.captured ?? "").sort().at(-1) ?? ""]),
  );

  const known = new Set(config.albums.map((a) => albumRef(a.library, a.name)));
  const added = albums.filter((a) => !known.has(albumRef(a.library, a.name)));
  for (const a of added) config.albums.push({ name: a.name, library: a.library, public: false });
  const missing = config.albums.filter((a) => !latest.has(albumRef(a.library, a.name)));
  if (!existing) {
    config.albums.sort((a, b) =>
      latest.get(albumRef(b.library, b.name)).localeCompare(latest.get(albumRef(a.library, a.name))),
    );
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n");
  console.log(`photos.config.json: ${config.albums.length} albums, ${added.length} new (added as private).`);
  if (missing.length) console.log(`Not in LightCraft any more: ${missing.map((a) => `${a.name} (${a.library})`).join(", ")}`);
  console.log('Set "public": true on the albums to show, and order them as they should appear.');
}

// ---------------------------------------------------------------- publish

function photoKey(photo, develop, config) {
  const identity = {
    v: ENCODER_VERSION,
    file: photo.fileName,
    size: [photo.width, photo.height],
    captured: photo.captured,
    develop,
    widths: config.widths,
    quality: config.quality,
  };
  return createHash("sha256").update(JSON.stringify(identity)).digest("hex").slice(0, 16);
}

function variantWidths(width, widths) {
  const out = widths.filter((w) => w < width);
  out.push(Math.min(width, Math.max(...widths)));
  return [...new Set(out)];
}

function isRendered(key) {
  const meta = path.join(CACHE_DIR, PREFIX, key, "meta.json");
  return fs.existsSync(meta);
}

async function renderBatch(config, batch, tmp, sharp) {
  const largest = Math.max(...config.widths);
  const commands = batch.map((p) => ({
    command: "app.export",
    params: {
      ids: [p.id],
      path: path.join(tmp, `${p.key}.png`),
      longEdge: largest,
      dontEnlarge: true,
      colorSpace: "srgb",
      bitDepth: 8,
      sharpen: "screen",
      metadata: "none",
      removeLocation: true,
      conflict: "overwrite",
    },
  }));
  const replies = await runPerLibrary(batch, (p) => commands[batch.indexOf(p)]);
  for (const [i, p] of batch.entries()) {
    must(replies[i], `export of ${p.fileName}`);
    const png = path.join(tmp, `${p.key}.png`);
    const dir = path.join(CACHE_DIR, PREFIX, p.key);
    fs.mkdirSync(dir, { recursive: true });
    const image = sharp(png);
    const { width, height } = await image.metadata();
    const { dominant } = await image.stats();
    // widths are the image's pixel width; config.widths are targets for that width
    const sizes = variantWidths(width, config.widths);
    for (const w of sizes) {
      const h = Math.round((height * w) / width);
      await sharp(png).resize(w, h).webp({ quality: config.quality, effort: 5 }).toFile(path.join(dir, `${w}.webp`));
    }
    const color = `#${[dominant.r, dominant.g, dominant.b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
    fs.writeFileSync(path.join(dir, "meta.json"), JSON.stringify({ width, height, sizes, color }));
    fs.rmSync(png, { force: true });
  }
}

async function publish() {
  const local = flag("local");
  const config = readConfig();
  const chosen = config.albums.filter((a) => a.public);
  if (!chosen.length) throw new Error('No album has "public": true in photos.config.json.');

  if (flag("connect") && new Set(chosen.map((a) => a.library)).size > 1) {
    throw new Error("--connect reaches only the library open in LightCraft, but the public albums span several: quit LightCraft and run without --connect.");
  }
  const found = new Map(
    (await listAlbums({ ...config, libraries: [...new Set(chosen.map((a) => a.library))] })).map((a) => [
      albumRef(a.library, a.name),
      a,
    ]),
  );
  const absent = chosen.filter((a) => !found.has(albumRef(a.library, a.name)));
  if (absent.length) {
    throw new Error(`Not found in LightCraft: ${absent.map((a) => `${a.name} (${a.library})`).join(", ")}`);
  }
  const lcAlbums = chosen.map((a) => found.get(albumRef(a.library, a.name)));
  const photosByAlbum = await albumPhotos(lcAlbums);

  // develop settings → keys
  // A photo in several albums comes back once per album: keep one object per photo, shared by all.
  // Photo ids are only unique within a library.
  const photoRef = (p) => `${p.library}\u0000${p.id}`;
  const unique = new Map();
  for (const list of photosByAlbum) {
    list.forEach((p, i) => {
      if (!unique.has(photoRef(p))) unique.set(photoRef(p), p);
      list[i] = unique.get(photoRef(p));
    });
  }
  const all = [...unique.values()];
  const devReplies = await runPerLibrary(all, (p) => ({ command: "develop.get", params: { id: p.id } }));
  all.forEach((p, i) => (p.key = photoKey(p, must(devReplies[i], `develop.get ${p.fileName}`), config)));

  // render what is new or edited
  const todo = all.filter((p) => !isRendered(p.key));
  console.log(`${all.length} photos in ${chosen.length} albums; ${todo.length} to render.`);
  if (todo.length) {
    const { default: sharp } = await import("sharp");
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "photos-export-"));
    try {
      for (let i = 0; i < todo.length; i += EXPORT_BATCH) {
        await renderBatch(config, todo.slice(i, i + EXPORT_BATCH), tmp, sharp);
        progress("Rendered", Math.min(i + EXPORT_BATCH, todo.length), todo.length);
      }
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  }

  // manifest
  const usedSlugs = new Set();
  const albums = chosen.map((choice, i) => {
    const lc = lcAlbums[i];
    let slug = choice.slug || slugify(choice.title || choice.name) || `album-${lc.id}`;
    while (usedSlugs.has(slug)) slug += "-2";
    usedSlugs.add(slug);
    const photos = [...photosByAlbum[i]]
      .sort((a, b) => (a.captured ?? "").localeCompare(b.captured ?? "") || a.fileName.localeCompare(b.fileName))
      .map((p) => {
        const meta = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, PREFIX, p.key, "meta.json"), "utf8"));
        return { key: p.key, ...meta };
      });
    const coverPhoto = unique.get(photoRef({ library: lc.library, id: lc.cover }));
    const dates = photosByAlbum[i].map((p) => p.captured).filter(Boolean).sort();
    return {
      slug,
      title: choice.title || choice.name,
      cover: coverPhoto && photos.some((p) => p.key === coverPhoto.key) ? coverPhoto.key : photos[0]?.key,
      from: dates[0]?.slice(0, 10) ?? null,
      to: dates.at(-1)?.slice(0, 10) ?? null,
      photos,
    };
  }).filter((a) => a.photos.length);
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify({ prefix: PREFIX, albums }, null, 1) + "\n");
  console.log(`Wrote src/data/photos.json (${albums.length} albums).`);

  const keys = new Set(all.map((p) => p.key));
  if (flag("prune")) {
    let removed = 0;
    for (const dir of fs.readdirSync(path.join(CACHE_DIR, PREFIX))) {
      if (!keys.has(dir)) {
        fs.rmSync(path.join(CACHE_DIR, PREFIX, dir), { recursive: true, force: true });
        removed++;
      }
    }
    console.log(`Removed ${removed} unused photos from public/photo-files.`);
  }

  if (local) {
    console.log("Local only: run `npm run dev` and open /photo.");
  } else {
    await uploadToR2(keys);
  }
}

// ---------------------------------------------------------------- R2

async function uploadToR2(keys) {
  const need = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET"].filter((k) => !process.env[k]);
  if (need.length) throw new Error(`Missing ${need.join(", ")} (in .env.local). Or publish with --local.`);
  const { S3Client, ListObjectsV2Command, PutObjectCommand, DeleteObjectsCommand } = await import("@aws-sdk/client-s3");
  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
  });
  const Bucket = process.env.R2_BUCKET;

  const remote = new Set();
  let ContinuationToken;
  do {
    const page = await s3.send(new ListObjectsV2Command({ Bucket, Prefix: `${PREFIX}/`, ContinuationToken }));
    for (const o of page.Contents ?? []) remote.add(o.Key);
    ContinuationToken = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (ContinuationToken);

  const files = [];
  for (const key of keys) {
    const dir = path.join(CACHE_DIR, PREFIX, key);
    for (const name of fs.readdirSync(dir)) {
      if (name.endsWith(".webp") && !remote.has(`${PREFIX}/${key}/${name}`)) files.push(`${PREFIX}/${key}/${name}`);
    }
  }
  console.log(`R2 bucket ${Bucket}: ${remote.size} files there, ${files.length} to upload.`);
  let done = 0;
  await mapLimit(files, 8, async (objectKey) => {
    await s3.send(
      new PutObjectCommand({
        Bucket,
        Key: objectKey,
        Body: fs.readFileSync(path.join(CACHE_DIR, objectKey)),
        ContentType: "image/webp",
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
    progress("Uploaded", ++done, files.length);
  });

  if (flag("prune")) {
    const stale = [...remote].filter((k) => !keys.has(k.split("/")[1]));
    for (let i = 0; i < stale.length; i += 1000) {
      await s3.send(
        new DeleteObjectsCommand({ Bucket, Delete: { Objects: stale.slice(i, i + 1000).map((Key) => ({ Key })) } }),
      );
    }
    console.log(`Deleted ${stale.length} unused files from R2.`);
  }
  console.log("Done. Commit src/data/photos.json and deploy the site.");
}

// ----------------------------------------------------------------

const commands = { init, publish };
if (!commands[command]) {
  console.log("Usage: node scripts/photos.mjs init | publish [--local] [--prune] [--connect]");
  process.exit(1);
}
commands[command]().catch((err) => {
  console.error(`\n${err.message}`);
  process.exit(1);
});
