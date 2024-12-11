import { type Metadata } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { Container } from '@/components/Container';
import { FadeIn } from '@/components/FadeIn';

import { pageInformation, Routes } from '../constant/allPages';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

const links = [
  {
    title: 'Design',
    content: 'Explore my work as a product designer. I am currently building Moody\'s design system for AI products.',
    href: pageInformation[Routes.Work]!.path,
  },
  {
    title: 'Photo',
    content: 'I am an amateur potographer. I am mostly taking pictures of NYC at the moment.',
    href: pageInformation[Routes.Photo]!.path,
  },
  {
    title: 'Music',
    content: 'I am an amateur composer. I am currently working on multiple classical music pieces.',
    href: pageInformation[Routes.Music]!.path,
  },
];

export const metadata: Metadata = {
  description: 'Pierre Pariente Dimitrov Portfolio',
};

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
      {/* Main Content */}
      <Container className="relative z-10 mt-10 sm:mt-32 md:mt-32">
        <FadeIn>
          <div className="w-full flex flex-col mb-32 md:space-y-2 md:mb-16 ">
            <h2 className="text-neutral-900 font-thin md:text-5xl text-2xl">Welcome to my</h2>
            <div className="w-full flex flex-col space-y-4 md:-space-y-4">
              <h1 className="text-neutral-900 font-bold uppercase md:text-[128px] text-[64px]">
                creative
              </h1>
              <h1 className="text-neutral-900 font-bold uppercase md:text-[128px] text-[64px]">
                space
              </h1>
            </div>

            <div className='relative h-[400px] w-full'>
              <div className="h-full w-80% lg:absolute lg:-top-24 lg:right-32 lg:h-full lg:w-80% object-cover z-0 overflow-hidden">
                <video
                  className="opacity-70"
                  src="/intro.mp4"
                  width="640"
                  height="360"
                  autoPlay
                  loop
                ></video>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 md:-space-y-12 w-full">
            {links.map((link, index) => (
              <Link href={link.href} key={index}>
                <FadeIn>
                  <div
                    className={`border border-gray-300 rounded-sm p-16 bg-white bg-opacity-50 backdrop-blur-[0.4px] flex flex-col space-y-12 justify-start md:w-[52%] transition-shadow duration-300 ease-in-out hover:shadow ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                      }`}
                  >
                    <div className="flex items-center animate-color-change space-x-4">
                      <h2 className="uppercase font-semibold text-5xl">{link.title}</h2>
                      <ArrowLongRightIcon className="h-6 w-6" />
                    </div>
                    <p className='text-2xl font-thin'>{link.content}</p>
                  </div>
                </FadeIn>
              </Link>
            ))}
          </div>
        </FadeIn>
      </Container >
    </>
  );
}
