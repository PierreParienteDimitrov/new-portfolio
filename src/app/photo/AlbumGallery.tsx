'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'
import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'
import { type Photo, photoSrcSet, photoUrl } from '@/lib/photos'

type Props = { title: string; photos: Photo[] }

const PARAM = 'photo'

/** 1-based photo number in the URL (?photo=3), or -1 when none/invalid. */
function indexFromUrl(count: number): number {
  const n = Number(new URLSearchParams(window.location.search).get(PARAM))
  return Number.isInteger(n) && n >= 1 && n <= count ? n - 1 : -1
}

function urlWith(index: number): string {
  const url = new URL(window.location.href)
  if (index < 0) url.searchParams.delete(PARAM)
  else url.searchParams.set(PARAM, String(index + 1))
  return url.pathname + url.search + url.hash
}

export default function AlbumGallery({ title, photos }: Props) {
  const [index, setIndex] = useState(-1)
  // true when opening the lightbox added a history entry, so closing it can go back
  const pushed = useRef(false)

  const items = useMemo(
    () =>
      photos.map((p, i) => {
        const srcSet = photoSrcSet(p)
        const alt = `${title}, photo ${i + 1} of ${photos.length}`
        return {
          key: p.key,
          src: photoUrl(p, p.sizes[p.sizes.length - 1]),
          width: p.width,
          height: p.height,
          srcSet,
          alt,
          label: `Open ${alt}`,
          color: p.color,
        }
      }),
    [photos, title],
  )

  // Open the photo named in the URL (a shared link), and follow the browser's back/forward buttons.
  useEffect(() => {
    const sync = () => {
      const i = indexFromUrl(photos.length)
      if (i < 0) pushed.current = false
      setIndex(i)
    }
    sync()
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [photos.length])

  const open = useCallback((i: number) => {
    window.history.pushState(window.history.state, '', urlWith(i))
    pushed.current = true
    setIndex(i)
  }, [])

  const close = useCallback(() => {
    setIndex(-1)
    if (pushed.current) {
      pushed.current = false
      window.history.back()
    } else {
      window.history.replaceState(window.history.state, '', urlWith(-1))
    }
  }, [])

  const view = useCallback(({ index: i }: { index: number }) => {
    setIndex(i)
    window.history.replaceState(window.history.state, '', urlWith(i))
  }, [])

  return (
    <>
      <RowsPhotoAlbum
        photos={items}
        spacing={(width) => (width < 640 ? 4 : 8)}
        targetRowHeight={(width) =>
          width < 640 ? 180 : width < 1024 ? 260 : 320
        }
        rowConstraints={{ singleRowMaxHeight: 480 }}
        sizes={{
          size: '1216px',
          sizes: [
            { viewport: '(max-width: 639px)', size: 'calc(100vw - 32px)' },
            { viewport: '(max-width: 1279px)', size: 'calc(100vw - 64px)' },
          ],
        }}
        onClick={({ index: i }) => open(i)}
        skeleton={<div className="min-h-[60vh]" />}
        render={{
          image: (props, { photo }) => (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- alt comes from props; files are pre-sized on R2
            <img
              {...props}
              loading="lazy"
              decoding="async"
              style={{ ...props.style, backgroundColor: photo.color }}
              className={`${props.className ?? ''} transition-opacity hover:opacity-90`}
            />
          ),
        }}
      />

      <Lightbox
        open={index >= 0}
        index={Math.max(index, 0)}
        close={close}
        slides={items.map(({ src, width, height, srcSet, alt }) => ({
          src,
          width,
          height,
          srcSet,
          alt,
        }))}
        on={{ view }}
        plugins={[Counter, Fullscreen, Zoom]}
        counter={{ container: { style: { top: 0, bottom: 'unset' } } }}
        carousel={{ finite: false, preload: 2, padding: '16px' }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
        zoom={{ maxZoomPixelRatio: 2, scrollToZoom: true }}
        labels={{
          Previous: 'Previous photo',
          Next: 'Next photo',
          Close: 'Close',
        }}
      />
    </>
  )
}
