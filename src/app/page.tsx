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
import logoTempso from '@/images/clients/tempso/tempso-logo-light.svg'
import logoBluecargo from '@/images/clients/bluecargo/bluecargo-logo-light.svg'
import logoSiemens from '@/images/clients/siemens/siemens-logo-light.svg'
import logoDelair from '@/images/clients/delair-labs/delair-logo-light.svg'
import logoBnp from '@/images/clients/bnp/bnp-logo-light.svg'
import logoBotw from '@/images/clients/bofw/bow-logo-light.svg'
import portrait from '@/images/pierrepariente.jpeg'

import logoSpectrum from '@/images/clients/spectrum/spectrum-logo-light.svg'
import imageFlow from '@/images/flows.jpg'
import { caseStudies } from '@/constant/caseStudy'
import { ICaseStudy } from '@/types/ICaseStudy'

const clients = [
  ['BlueCargo', logoBluecargo],
  ['Spectrum', logoSpectrum],
  ['Tempso', logoTempso],
  ['Delair', logoDelair],
  ['BNP Paribas', logoBnp],
  ['Siemens', logoSiemens],
]

function Clients() {
  return (
    <div className="py-8">
      <FadeIn className="flex items-center gap-x-8">
        <h5 className="uppercase text-center font-display font-semibold text-neutral-950">
          Over the last 10 years, I have worked with
        </h5>
        <div className="h-px flex-auto bg-neutral-800" />
      </FadeIn>
      <FadeInStagger faster>
        <ul
          role="list"
          className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-3"
        >
          {clients.map(([client, logo]) => (
            <li key={client} className='w-full h-24 flex justify-center items-center border border-gray-200 rounded-sm hover:bg-neutral-50 hover:cursor-pointer'>
              <FadeIn>
                <Image src={logo} alt={client} unoptimized />
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </div>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<ICaseStudy>
}) {
  return (
    <>
      <SectionIntro
        title="My most recent achievements"
        className="mt-24 sm:mt-32 lg:mt-40 font-light"
      >
        <h4>As a Senior Product Designer and first employee at BlueCargo, a Y Combinator (YC) Series-A startup in the supply chain industry, I played a pivotal role in scaling the company&apos;s product, revenue and team.</h4>
        <br></br>
        <h4>I previously rebuilt Charter TV design systems and created Tempso, a classical music wrapper for Spotify and Apple Music.</h4>
      </SectionIntro >
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 overflow-hidden">
                <h3>
                  <Link href={caseStudy.href}>
                    <Image
                      src={caseStudy.src}
                      alt={caseStudy.client}
                      // className="h-16 w-16"
                      sizes="100vw"
                      unoptimized
                    />
                  </Link>
                </h3>

                <div className='p-8'>

                  <p className="flex gap-x-2 text-neutral-600 font-medium">
                    <time
                      dateTime={caseStudy.year}                    >
                      {caseStudy.year}
                    </time>
                    <span className="text-neutral-300" aria-hidden="true">
                      /
                    </span>
                    <span>{caseStudy.client}
                    </span>

                  </p>
                  <h3 className="mt-4 font-display font-medium text-neutral-950">
                    {caseStudy.title}
                  </h3>
                  <p className="mt-1 text-neutral-600 font-light">
                    {caseStudy.description}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="My process"
        title="I am a full stack product designer & engineer with extensive experience in user experience and interface."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <h4>
          My skills covers user research, user flows, wireframes, high-fidelity mockups, design systems and developer documentation.
        </h4>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageFlow}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="User research">
              As a product designer, I prioritize understanding users by conducting qualitative interviews, immersive on-sites, and analyzing available data to uncover their needs, frustrations, and digital fluency.</ListItem>
            <ListItem title="User flows and wireframes">
              Through user flows & wireframes I test assumptions against real life and iterate closely with a few selected users to improve the experience and make sure to cover at least the essentials needs.
            </ListItem>
            {/* <ListItem title="Product roadmap">
              I refine user experiences by testing assumptions with user flows and wireframes, iterating closely with select users to ensure essential needs are met.
            </ListItem> */}
            <ListItem title="High-fidelity mockups and prototypes">
              When the user experience is solidified, I build high-fidelity mockups & prototypes of the product for a last round of internal and external validation.
            </ListItem>
            <ListItem title="Design systems and documentation">
              After finalizing the high-fidelity designs, I develop comprehensive documentation to accelerate the engineering process and continuously build, maintain, and enhance the design system and component library.
            </ListItem>
            <ListItem title="Development">
              My engineering skills in HTML, CSS, JavaScript/TypeScript, and libraries like React, along with frameworks such as Next.js, Express.js, and Tailwind.css, enable me to build live prototypes and MVPs to test product assumptions with end users.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

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
      <Container className="mt-10 sm:mt-32 md:mt-32 relative">
        <FadeIn className="max-w-3xl">
          <Image src={portrait} width={200} alt="Pierre Pariente Dimitrov" unoptimized className='rounded-full mb-12' />
          <h1 className="font-display font-medium tracking-tight text-neutral-950">
            Hi, my name is Pierre Pariente Dimitrov.</h1>
          <h3 className="mt-6 text-neutral-600 font-light">
            I am a product designer and software engineer. For the last 10 years I have been helping startups and big corporations deliver better experience across iOS, Android, Web and TV.</h3>
        </FadeIn>
      </Container>
      <div className='mx-auto max-w-7xl px-6 lg:px-8 mt-16 sm:mt-16'>
        <Clients />
      </div>


      <CaseStudies caseStudies={introCaseStudies} />

      {/* <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Phobia', logo: logoPhobiaDark }}
      >
        The team at Studio went above and beyond with our onboarding, even
        finding a way to access the user’s microphone without triggering one of
        those annoying permission dialogs.
      </Testimonial> */}

      <Services />

      <ContactSection />
    </>
  )
}
