import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Testimonial } from '@/components/Testimonial'
import logoTempso from '@/images/clients/tempso/tempso-logo-light.svg'
import logoBluecargo from '@/images/clients/bluecargo/bluecargo-logo-light.svg'
import logoSiemens from '@/images/clients/siemens/siemens-logo-light.svg'
import logoDelair from '@/images/clients/delair-labs/delair-logo-light.svg'
import logoBnp from '@/images/clients/bnp/bnp-logo-light.svg'
import logoBotw from '@/images/clients/bofw/bow-logo-light.svg'
import logoSpectrum from '@/images/clients/spectrum/spectrum-logo-light.svg'
import { formatDate } from '@/lib/formatDate'
import { caseStudies } from '@/constant/caseStudy'
import { ICaseStudy } from '@/types/ICaseStudy'

function CaseStudies({
    caseStudies,
}: {
    caseStudies: Array<ICaseStudy>
}) {
    return (
        <Container className="mt-40">
            <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                    Case studies
                </h2>
            </FadeIn>
            <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
                {caseStudies.map((caseStudy) => (
                    <FadeIn key={caseStudy.client}>
                        <article>
                            <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                                    <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                                        <Image
                                            src={caseStudy.src}
                                            width={300}
                                            height={100}
                                            alt=""
                                            unoptimized
                                        />
                                        <h3 className="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                                            {caseStudy.client}
                                        </h3>
                                    </div>
                                    <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                                        <p className="text-sm text-neutral-950 lg:mt-2">
                                            {caseStudy.year}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                                    <p className="font-display text-4xl font-medium text-neutral-950">
                                        <Link href={caseStudy.href}>{caseStudy.title}</Link>
                                    </p>
                                    <div className="mt-6 space-y-6 text-base text-neutral-600">
                                        {caseStudy.description}
                                    </div>
                                    <div className="mt-8 flex">
                                        <Button
                                            href={caseStudy.href}
                                            aria-label={`Read case study: ${caseStudy.client}`}
                                        >
                                            Read case study
                                        </Button>
                                    </div>
                                </div>
                            </Border>
                        </article>
                    </FadeIn>
                ))}
            </div>
        </Container>
    )
}

const clients = [
    ['Spectrum', logoSpectrum],
    ['Siemens', logoSiemens],
    ['BNP Paribas', logoBnp],
    ['Delair', logoDelair],
    ['BlueCargo', logoBluecargo],
    ['Tempso', logoTempso],
    ['Bank of the West', logoBotw],
]

function Clients() {
    return (
        <Container className="mt-24 sm:mt-32 lg:mt-40">
            <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                    You’re in good company
                </h2>
            </FadeIn>
            <FadeInStagger className="mt-10" faster>
                <Border as={FadeIn} />
                <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
                >
                    {clients.map(([client, logo]) => (
                        <li key={client} className="group">
                            <FadeIn className="overflow-hidden">
                                <Border className="pt-12 group-[&:nth-child(-n+2)]:-mt-px sm:group-[&:nth-child(3)]:-mt-px lg:group-[&:nth-child(4)]:-mt-px">
                                    <Image src={logo} alt={client} unoptimized />
                                </Border>
                            </FadeIn>
                        </li>
                    ))}
                </ul>
            </FadeInStagger>
        </Container>
    )
}

export const metadata: Metadata = {
    title: 'Our Work',
    description:
        'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
}

export default async function Work() {

    return (
        <>
            <PageIntro
                eyebrow="My work"
                title="Creative, swift problem-solver with profound empathy for users' needs."
            >
                <p>
                    As a lead product designer with expertise in front-end engineering, I bring a unique blend of technical and creative skills. Most recently, I have built and maintained a complex, cross-platform and cross-team component library for all video platforms at Spectrum. At BlueCargo (YC, series A startup), as a lead product designer, I conduct user research, create user flows, wireframes, prototypes, high-fidelity mockups, and engineering documentation, as well as build and manage the team roadmap and mentor junior designers. Additionally, I am a co-founder and product designer at Tempso, a classical music app for Spotify and Apple Music.
                </p>
            </PageIntro >

            <CaseStudies caseStudies={caseStudies} />

            {/* <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Mail Smirk', logo: logoMailSmirk }}
      >
        We approached <em>Studio</em> because we loved their past work. They
        delivered something remarkably similar in record time.
      </Testimonial> */}

            <Clients />

            <ContactSection />
        </>
    )
}
