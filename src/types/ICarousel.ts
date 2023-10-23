import { type StaticImageData } from 'next/image'


export interface ICarousel {
    title: string
    src: string | StaticImageData
    alt: string
}
