import { type Metadata } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'


import { pageInformation, Routes } from '../constant/allPages'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'



const links = [
  {
    title: 'Design',
    href: pageInformation[Routes.Work]!.path,
  },
  {
    title: 'Photo',
    href: pageInformation[Routes.Photo]!.path,
  },
  {
    title: 'Music',
    href: pageInformation[Routes.Music]!.path,
  },
]


export const metadata: Metadata = {
  description:
    'Pierre Pariente Dimitrov Portfolio',
}

export default function Home() {



  return (
    <>
      <Head>
        <meta
          property="og:url"
          content="https://www.pierreparientedimitrov.com/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="website-preview" />
        <meta
          property="og:description"
          content="Pierre Pariente Dimitrov Portfolio - UX/UI designer & Software Engineer"
        />
        <meta property="og:image" content="/website-preview.png" />
      </Head>
      <Container className="mt-10 sm:mt-32 md:mt-32 relative">
        <FadeIn>
          <div className='w-full'>
            <h2 className="text-neutral-900 font-medium md:text-6xl text-5xl">
              Welcome to my <span className='font-bold text-fuchsia-800'>creative space!</span> Explore my work as a product designer, and amateur photographer & composer.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">

            {links.map((link, index) => (
              <Link key={index} href={link.href} className="border border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center animate-color-change">
                <div className="py-8 flex items-center justify-center text-center">
                  <h3>
                    {link.title}
                  </h3>
                  <ArrowLongRightIcon className="h-6 w-6" />
                </div>
              </Link>
            ))}
          </div>

          {/* <Image src={portrait} width={200} alt="Pierre Pariente Dimitrov" unoptimized className='rounded-full mb-12' /> */}
        </FadeIn>
      </Container >

    </>
  )
}
