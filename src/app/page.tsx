import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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
    <div className="sm:mt-32 py-8">
      <FadeIn className="flex items-center gap-x-8">
        <h2 className="text-center font-display text-sm font-semibold tracking-wider text-neutral-950 sm:text-left">
          Over the last 10 years, I have worked with
        </h2>
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
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>As a Senior Product Designer and first employee at BlueCargo, a Y Combinator (YC) Series-A startup in the supply chain industry, I played a pivotal role in scaling the company&apos;s product, revenue and team.</p>
        <br></br>
        <p>I previously rebuilt Charter TV design systems and created Tempso, a classical music wrapper for Spotify and Apple Music.</p>
      </SectionIntro >
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <Image
                      src={caseStudy.src}
                      alt={caseStudy.client}
                      // className="h-16 w-16"
                      width={600}
                      height={100}
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.year}
                    className="font-semibold"
                  >
                    {caseStudy.year}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
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
        title="I am a full stack product designer with extensive experience in user experience and interface."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          My skills covers user research, user flows, wireframes, high-fidelity mockups, design systems and developer documentation.
        </p>
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
              As a product designer, my primary job is to empathize with the final user through research. I start by building a clear picture of the user’s desires, frustrations, goals and technology literacy through qualitative interviews, on-sites, and second-hand information when available.
            </ListItem>
            <ListItem title="User flows and wireframes">
              Through user flows & wireframes I test assumptions against real life and iterate closely with a few selected users to improve the experience and make sure to cover at least the essentials needs.
            </ListItem>
            <ListItem title="Product roadmap">
              With the relevant stakeholder, I help build product and feature roadmaps by order of importance for the business and the user.
            </ListItem>
            <ListItem title="High-fidelity mockups and prototypes">
              When the user experience is solidified, I build high-fidelity mockups & prototypes of the product for a last round of internal and external validation.
            </ListItem>
            <ListItem title="Design systems and documentation">
              Once the high-fi are solidified, I build developer documentation to speed-up the engineering cycle, as long as build, maintain and expand the design system & component library.
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

  const introCaseStudies = caseStudies.slice(0, 4)

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Hi, my name is Pierre Pariente Dimitrov.</h1>
          <p className="mt-6 text-xl text-neutral-600">
            I am a product designer and for the last 10 years I have been helping startups and big corporations deliver better experience across iOS, Android, Web and TV.</p>
        </FadeIn>
      </Container>
      <div className='mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32'>
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
