import { type ImageProps } from 'next/image'


export interface ICaseStudy {
    key: string
    client: string
    year: string
    platform: string
    title: string
    description: string
    href: string
    src: ImageProps['src']
    alt: string
    external: boolean
    projectType: string
    metrics: string[]
    latest: boolean
}