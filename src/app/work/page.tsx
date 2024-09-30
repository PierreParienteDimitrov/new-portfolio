"use client"

import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import logoTempso from '@/images/clients/tempso/tempso-logo-light.svg'
import logoBluecargo from '@/images/clients/bluecargo/bluecargo-logo-light.svg'
import logoSiemens from '@/images/clients/siemens/siemens-logo-light.svg'
import logoDelair from '@/images/clients/delair-labs/delair-logo-light.svg'
import logoBnp from '@/images/clients/bnp/bnp-logo-light.svg'
import logoBotw from '@/images/clients/bofw/bow-logo-light.svg'
import logoSpectrum from '@/images/clients/spectrum/spectrum-logo-light.svg'
import { caseStudies } from '@/constant/caseStudy'
import { ICaseStudy } from '@/types/ICaseStudy'
import Tabs from '@/components/Tabs'
import { useState } from 'react'

interface CaseStudiesProps {
    caseStudies: Array<ICaseStudy>;
}

function CaseStudies({ caseStudies = [] }: CaseStudiesProps) {
    return (
        <div className="py-16">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12">
                {caseStudies.map((caseStudy) => (
                    <FadeIn key={caseStudy.key}>
                        <Link
                            href={caseStudy.href}
                            aria-label={`Read case study: ${caseStudy.client}`}
                        >
                            <div className="h-full px-8 py-4 rounded-4xl bg-gray-50 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100">
                                <h1 className="mt-6 text-4xl font-semibold text-neutral-950 pb-2">
                                    {caseStudy.title}
                                </h1>
                                <div className="flex items-center space-x-6 border-b border-gray-200 mb-8">
                                    <p className="text-2xl font-regular text-neutral-500">
                                        {caseStudy.client}
                                    </p>
                                    <div className='py-4 flex space-x-4'>
                                        {caseStudy.filters.map((item, index) => (
                                            <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200" key={index}>
                                                <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-red-500">
                                                    <circle r={3} cx={3} cy={3} />
                                                </svg>
                                                {item}
                                            </span>
                                        ))}

                                    </div>
                                </div>
                                <Image
                                    src={caseStudy.src}
                                    width={300}
                                    height={100}
                                    alt=""
                                    className="w-full h-auto rounded-2xl object-cover shadow-lg"
                                    unoptimized
                                />
                            </div>
                        </Link>
                    </FadeIn>
                ))}
            </div>
        </div>
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

const initialTabs = [
    { name: 'All', href: '#', current: true, key: 'all' },
    { name: 'Desktop', href: '#', current: false, key: 'desktop' },
    { name: 'Mobile', href: '#', current: false, key: 'mobile' },
    { name: 'Marketing & Brand', href: '#', current: false, key: 'marketing' },
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

export default function Work() {

    const [tabs, setTabs] = useState(initialTabs);

    const [currentFilter, setCurrentFilter] = useState<string>('all');


    const handleTabClick = (tabKey: string) => {
        setTabs((prevTabs) =>
            prevTabs.map((tab) =>
                tab.key === tabKey
                    ? { ...tab, current: true }
                    : { ...tab, current: false }
            )
        );
        setCurrentFilter(tabKey.toLowerCase());

    };

    const filteredCaseStudies = caseStudies.filter((caseStudy) =>
        currentFilter === 'all'
            ? true
            : caseStudy.filters.includes(currentFilter)
    );


    return (
        <Container>
            <div className='w-full mt-32'>
                <h2 className="text-neutral-900 font-medium md:text-7xl text-5xl">
                    Pierre Pariente is a  <span className='font-bold text-fuchsia-800'>product designer </span>who collaborates with founders and larger companies to build innovative products and develop scalable design systems and strategies across teams.
                </h2>
            </div>
            <PageIntro
            >
                <Tabs tabs={tabs} onTabClick={handleTabClick} />
            </PageIntro >


            <CaseStudies caseStudies={filteredCaseStudies} />

            {/* <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Mail Smirk', logo: logoMailSmirk }}
      >
        We approached <em>Studio</em> because we loved their past work. They
        delivered something remarkably similar in record time.
      </Testimonial> */}

            <Clients />

            <ContactSection />
        </Container>
    )
}
