"use client"


import { pageInformation, Routes } from '../../constant/allPages'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { caseStudies } from '@/constant/caseStudy'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { PageIntro } from '@/components/PageIntro'
import { ICaseStudy } from '@/types/ICaseStudy'


import { SectionIntro } from '@/components/SectionIntro'
import { TagList, TagListItem } from '@/components/TagList'
import { StatList, StatListItem } from '@/components/StatList'
import { EnterPassword } from '@/components/EnterPassword'
import { ContactSection } from '@/components/ContactSection'
import GE1 from '@/images/work/product-marketing/ge-1.png'
import GE2 from '@/images/work/product-marketing/ge-2.png'
import GE3 from '@/images/work/product-marketing/ge-3.png'
import SLIDE01 from '@/images/work/product-marketing/slide-01.png'
import SLIDE02 from '@/images/work/product-marketing/slide-02.png'
import SLIDE03 from '@/images/work/product-marketing/slide-03.png'
import SLIDE04 from '@/images/work/product-marketing/slide-04.png'
import SLIDE05 from '@/images/work/product-marketing/slide-05.png'
import SLIDE06 from '@/images/work/product-marketing/slide-06.png'
import SLIDE07 from '@/images/work/product-marketing/slide-07.png'



const itemsTitleClass = 'font-medium mt-16 mb-4 text-[24px]'



const Role = () => {
    return (

        <div className='flex flex-col items-center mt-24'>
            <h3 className='font-bold'>
                Assets
            </h3>
            <TagList className="mt-4">
                <TagListItem>Sales Deck</TagListItem>
                <TagListItem>Flyers</TagListItem>
                <TagListItem>Ads</TagListItem>
                <TagListItem>Tradeshow assets</TagListItem>
                <TagListItem>Customer sucess stories</TagListItem>
            </TagList>
        </div>
    )
}

const Stats = () => {
    return (
        <div>
            <div className='p-8 border border-gray-100 bg-gray-50 mt-24'>
                <StatList>
                    <StatListItem value="+1,000" label="Sales lead contacted" />
                    <StatListItem value="+100" label="Sales deck presentation to qualified leads" />
                    <StatListItem value="+50" label="tradeshows and marketing events" />
                </StatList>
            </div>
        </div>
    )
}

const geAppliances = [GE1, GE2, GE3]

const slides = [SLIDE01, SLIDE02, SLIDE03, SLIDE04, SLIDE05, SLIDE06, SLIDE07]



const ProductMarketing = () => {

    const caseStudy: ICaseStudy = caseStudies.find((study) => study.key === 'marketing') as ICaseStudy;



    return (
        <>
            <Head>
                <title>{pageInformation[Routes.ProductMarketing]!.title}</title>
                <meta
                    property="og:url"
                    content="https://www.pierreparientedimitrov.com/"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="website-preview" />
                <meta
                    property="og:description"
                    content="Pierre Pariente Dimitrov Portfolio = UX/UI designer & Software Engineer"
                />
                <meta property="og:image" content="/website-preview.png" />
            </Head>


            <article className="mt-24 sm:mt-32 lg:mt-40">
                <header>
                    <PageIntro eyebrow="Case Study" title={caseStudy.title} centered>
                        <p>{caseStudy.description}</p>
                    </PageIntro>

                    <FadeIn>
                        <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
                            <Container>
                                <div className="mx-auto max-w-5xl">
                                    <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
                                        <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                                            <dt className="font-semibold">Client</dt>
                                            <dd>{caseStudy.client}</dd>
                                        </div>
                                        <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                                            <dt className="font-semibold">Year</dt>
                                            <dd>
                                                {caseStudy.year}
                                            </dd>
                                        </div>
                                        <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                                            <dt className="font-semibold">Platform</dt>
                                            <dd>{caseStudy.platform}</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="border-y border-neutral-200 bg-neutral-100">
                                    <div className="mx-auto max-w-[76rem] bg-neutral-200">
                                        <GrayscaleTransitionImage
                                            src={caseStudy.src}
                                            quality={90}
                                            sizes="(min-width: 1216px) 76rem, 100vw"
                                            priority
                                            className="rounded-md"
                                        />
                                    </div>
                                </div>
                            </Container>
                        </div>

                        <div className='mt-24'>
                            <Container>
                                <Role />
                                <Stats />
                            </Container>
                        </div>
                        {/* Success Stories */}
                        <Container className='flex items-center'>
                            <SectionIntro smaller={false} title=''>
                                <p className={itemsTitleClass}>Customer Success Stories</p>
                                <p>
                                    I authored and designed customer success stories for BlueCargo, including a success story featuring GE Appliances.
                                </p>
                                <br /><br />
                            </SectionIntro>
                        </Container>
                        <Container>
                            <div className='flex justify-center flex-col px-4 md:px-16 py-4'>
                                {geAppliances.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <article className="relative flex w-full flex-col rounded-3xl ring-1 ring-neutral-300 transition hover:bg-neutral-50 overflow-hidden mb-8">
                                                <GrayscaleTransitionImage
                                                    src={item}
                                                    quality={90}
                                                    sizes="(min-width: 1216px) 76rem, 100vw"
                                                    priority
                                                    className="rounded-md"
                                                />
                                            </article>
                                        </div>
                                    );
                                })}
                            </div>
                        </Container>

                        {/* Slides */}
                        <Container className='flex items-center'>
                            <SectionIntro smaller={false} title=''>
                                <p className={itemsTitleClass}>Marketing & Sales Decks</p>
                                <p>
                                    I authored and designed sales & marketing decks to support sales and customer success teams.
                                </p>
                                <br /><br />
                            </SectionIntro>
                        </Container>
                        <Container>
                            <div className='flex justify-center flex-col px-4 md:px-16 py-4'>
                                {slides.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <article className="relative flex w-full flex-col rounded-3xl ring-1 ring-neutral-300 transition hover:bg-neutral-50 overflow-hidden mb-8">
                                                <GrayscaleTransitionImage
                                                    src={item}
                                                    quality={90}
                                                    sizes="(min-width: 1216px) 76rem, 100vw"
                                                    priority
                                                    className="rounded-md"
                                                />
                                            </article>
                                        </div>
                                    );
                                })}
                            </div>
                        </Container>
                    </FadeIn>
                </header>
                <ContactSection />
            </article >
        </>
    )
}


export default ProductMarketing



