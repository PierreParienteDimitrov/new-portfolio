import { type Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'
import { coverOf, getAlbum, getAlbums, photoUrl } from '@/lib/photos'
import AlbumGallery from '../AlbumGallery'

type Props = { params: { album: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return getAlbums().map((a) => ({ album: a.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const album = getAlbum(params.album)
  if (!album) return {}
  const cover = coverOf(album)
  const width =
    cover.sizes.find((w) => w >= 1200) ?? cover.sizes[cover.sizes.length - 1]
  return {
    title: `${album.title} - Pierre Pariente Dimitrov Photography`,
    description: `${album.photos.length} photos by Pierre Pariente Dimitrov.`,
    openGraph: {
      images: [
        {
          url: photoUrl(cover, width),
          width,
          height: Math.round((cover.height * width) / cover.width),
        },
      ],
    },
  }
}

export default function AlbumPage({ params }: Props) {
  const album = getAlbum(params.album)
  if (!album) notFound()

  return (
    <>
      <PageIntro eyebrow="Photography" title={album.title}>
        <p>{album.photos.length} photos</p>
      </PageIntro>

      <Container className="mt-12 sm:mt-16">
        <Link
          href="/photo"
          className="text-sm font-semibold text-neutral-950 underline-offset-4 hover:underline"
        >
          ← All albums
        </Link>
        <div className="mt-6">
          <AlbumGallery title={album.title} photos={album.photos} />
        </div>
      </Container>
    </>
  )
}
