import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'

import { pageInformation, Routes } from '../constant/allPages'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'


import { caseStudies } from '@/constant/caseStudy'





export const metadata: Metadata = {
  description:
    'Pierre Pariente Dimitrov Portfolio',
}

export default function Home() {

  const introCaseStudies = caseStudies.filter(caseStudy => caseStudy.latest)


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
      <Container className="mt-10 sm:mt-32 md:mt-16 relative">
        <FadeIn>
          <div className='w-full'>
            <h2 className="text-neutral-900 font-medium md:text-7xl text-5xl">
              Pierre Pariente is a  <span className='font-bold text-fuchsia-800'>product designer </span>who collaborates with founders and larger companies to build innovative products and create scalable design systems and strategies across teams.
            </h2>
          </div>
          <h3 className='py-16 flex space-x-4 items-center animate-color-change'>
            <Link href={`${pageInformation[Routes.Work]!.path}`}>Checkout some samples</Link>
            <ArrowLongRightIcon className="h-6 w-6" />
          </h3>
          {/* <Image src={portrait} width={200} alt="Pierre Pariente Dimitrov" unoptimized className='rounded-full mb-12' /> */}
        </FadeIn>
      </Container >

    </>
  )
}
