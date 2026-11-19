import manifest from '@/data/photos.json'

/** One photo, as written by scripts/photos.mjs. */
export type Photo = {
  key: string
  /** pixel size of the largest file */
  width: number
  height: number
  /** widths available as <width>.webp, smallest first */
  sizes: number[]
  /** dominant colour, shown while the photo loads */
  color: string
}

export type Album = {
  slug: string
  title: string
  cover: string
  from: string | null
  to: string | null
  photos: Photo[]
}

type Manifest = { prefix: string; albums: Album[] }

const data = manifest as Manifest

/** Where the files live: the R2 domain in production, public/photo-files when developing. */
const BASE_URL = (
  process.env.NEXT_PUBLIC_PHOTOS_BASE_URL || '/photo-files'
).replace(/\/$/, '')

export function getAlbums(): Album[] {
  return data.albums
}

export function getAlbum(slug: string): Album | undefined {
  return data.albums.find((a) => a.slug === slug)
}

export function photoUrl(photo: Photo, width: number): string {
  return `${BASE_URL}/${data.prefix}/${photo.key}/${width}.webp`
}

export function photoSrcSet(photo: Photo) {
  return photo.sizes.map((w) => ({
    src: photoUrl(photo, w),
    width: w,
    height: Math.round((photo.height * w) / photo.width),
  }))
}

/** "srcset" attribute value for a plain <img>. */
export function srcSetAttr(photo: Photo): string {
  return photo.sizes.map((w) => `${photoUrl(photo, w)} ${w}w`).join(', ')
}

export function coverOf(album: Album): Photo {
  return album.photos.find((p) => p.key === album.cover) ?? album.photos[0]
}
