'use client'

import dynamic from 'next/dynamic'

import { Container } from '@/components/Container'
import Animation from '@/images/Lottie/Animation.json'

// lottie-web touches `document` as soon as it is imported, which breaks prerendering on
// Node 21+ (Vercel builds on Node 22). Load it in the browser only.
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export function Loading() {
  return (
    <Container className="flex h-full w-full items-center justify-center">
      <Lottie animationData={Animation} loop={true} />
    </Container>
  )
}
