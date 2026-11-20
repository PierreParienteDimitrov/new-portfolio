# Photos section

`/photo` lists the albums. `/photo/<album>` shows an album as a justified grid. Clicking a photo opens it
full screen:

- **Arrows:** the ← → keys, the on-screen arrows, or a swipe.
- **Close:** Esc, ×, a click on the background, or a pull down.
- **Zoom:** a scroll, a pinch or a double-tap.
- **Links:** the URL updates (`?photo=12`), so you can share a photo's link and the browser's Back button
  closes it.

## How it works

```
LightCraft library  ──(scripts/photos.mjs)──►  WebP files  ──►  Cloudflare R2  ──►  visitors' browsers
(your edits)          export → resize           640–2560 px      img.<domain>
                      → upload                  src/data/photos.json ──► the Next.js pages (built ahead of time)
```

- **LightCraft** is only needed when you publish. The site never talks to it.
- **The files:** each photo is exported with its edits applied, then saved as WebP at 640, 1280, 1920 and
  2560 px wide (fewer for small photos).
- **What's removed:** the files keep no metadata, including GPS.
- **Folder names:** files go in `photos/<key>/<width>.webp`. The key is a hash of the photo plus its edits.
  Re-editing a photo gives it a new key, so files never change once uploaded and can be cached for a year.
- **What gets committed:** `src/data/photos.json` lists the albums, the photos in order, their sizes and a
  placeholder color. The site reads it at build time, and you commit it. The image files themselves aren't
  committed (`public/photo-files/` is in `.gitignore`).

## Publish

1. **List your albums:** run `npm run photos:init`. It writes the albums of every library listed in
   `"libraries"` in `photos.config.json` (today `~/Pictures/LightCraft Photos` and
   `~/Pictures/LightCraft Library`) into that file. Each album records its `"library"`. New albums start
   private, and your existing settings are kept. To read another library, add its path to `"libraries"`.
2. **Pick albums:** in `photos.config.json`, set `"public": true` on the albums to show and put them in the
   order they should appear. You can also set `"title"` (the name shown on the site) and `"slug"` (the URL).
3. **Quit LightCraft:** the script opens the libraries itself. Alternatively, run the app with
   `--control 7980` and add `--connect` to the command; that only works when every public album is in the
   library the app has open.
4. **Try it locally:** run `npm run photos:publish -- --local`, then `npm run dev` and open
   <http://localhost:3000/photo>.
5. **Publish:** run `npm run photos:publish`. Only new or edited photos are rendered and uploaded.
6. **Deploy:** commit `src/data/photos.json` and deploy.

Add `--prune` to delete files that no photo uses any more, locally and on R2.

## One-time Cloudflare R2 setup

1. **Create an account:** sign up at <https://dash.cloudflare.com>. R2 needs a payment method on file, even
   on the free tier (10 GB storage, no transfer fees).
2. **Create a bucket:** go to **R2 → Create bucket** and name it, for example, `parientedimitrov-photos`.
3. **Connect your domain:** in the bucket, go to **Settings → Custom Domains → Connect Domain** and enter
   `img.parientedimitrov.com`. The domain's DNS has to be on Cloudflare.
   - If it isn't on Cloudflare yet, you can test with the bucket's `r2.dev` public URL. Cloudflare
     rate-limits that URL, so don't use it for the live site.
4. **Create an access key:** go to **R2 → Manage API tokens → Create API token**, choose **Object Read &
   Write**, and limit it to this bucket.
5. **Save the credentials:** put them in `.env.local`. That file isn't committed (`.env*` is in
   `.gitignore`).
   ```
   R2_ACCOUNT_ID=...
   R2_ACCESS_KEY_ID=...
   R2_SECRET_ACCESS_KEY=...
   R2_BUCKET=parientedimitrov-photos
   NEXT_PUBLIC_PHOTOS_BASE_URL=https://img.parientedimitrov.com
   ```
6. **Set the photo URL on your host:** where the site is hosted (Vercel, for example), set
   `NEXT_PUBLIC_PHOTOS_BASE_URL` to the same value. Without it, the site looks for the photos in
   `/photo-files`, the local folder.

## Costs

The 471 photos in your albums come to about 0.3–0.6 GB of WebP, well under R2's free 10 GB. R2 charges nothing
for transfer, and reads are free up to 10 million a month. Vercel's image optimization isn't used, so its
quotas don't apply.
