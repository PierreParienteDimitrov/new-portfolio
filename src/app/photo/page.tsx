import { type Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { coverOf, getAlbums, photoUrl, srcSetAttr } from '@/lib/photos'

export const metadata: Metadata = {
  title: 'Pierre Pariente Dimitrov - Photography',
  description: 'Photo albums by Pierre Pariente Dimitrov.',
}

export default function PhotosPage() {
  const albums = getAlbums()

  return (
    <>
      <PageIntro eyebrow="Photography" title="Photo Albums" centered />

      <Container className="mt-16 sm:mt-20">
        {albums.length === 0 ? (
          <p className="text-center text-neutral-600">No albums yet.</p>
        ) : (
          <FadeInStagger faster>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album, i) => {
                const cover = coverOf(album)
                return (
                  <li key={album.slug}>
                    <FadeIn>
                      <Link
                        href={`/photo/${album.slug}`}
                        className="group block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
                      >
                        <div
                          className="aspect-[4/3] overflow-hidden"
                          style={{ backgroundColor: cover.color }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element -- files are pre-sized on R2 */}
                          <img
                            src={photoUrl(
                              cover,
                              cover.sizes[Math.min(1, cover.sizes.length - 1)],
                            )}
                            srcSet={srcSetAttr(cover)}
                            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                            alt=""
                            loading={i < 3 ? 'eager' : 'lazy'}
                            decoding="async"
                            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
                          />
                        </div>
                        <h2 className="mt-4 font-display text-lg font-semibold text-neutral-950">
                          {album.title}
                        </h2>
                        <p className="mt-1 text-sm text-neutral-600">
                          {album.photos.length}{' '}
                          {album.photos.length === 1 ? 'photo' : 'photos'}
                        </p>
                      </Link>
                    </FadeIn>
                  </li>
                )
              })}
            </ul>
          </FadeInStagger>
        )}
      </Container>
    </>
  )
}
