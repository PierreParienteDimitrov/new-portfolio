import { pageInformation, Routes } from '../../constant/pages'
import Head from 'next/head'
import React from 'react'
import { caseStudies } from '@/constant/caseStudy'


import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { MDXComponents } from '@/components/MDXComponents'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { ICaseStudy } from '@/types/ICaseStudy'





const Tempso = () => {
    const tempsoCase: ICaseStudy = caseStudies.find((study) => study.key === 'tempso') as ICaseStudy;


    return (
        <article className="mt-24 sm:mt-32 lg:mt-40">
            <header>
                <PageIntro eyebrow="Case Study" title={tempsoCase.title} centered>
                    <p>{tempsoCase.description}</p>
                </PageIntro>

                <FadeIn>
                    <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
                        <Container>
                            <div className="mx-auto max-w-5xl">
                                <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
                                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                                        <dt className="font-semibold">Client</dt>
                                        <dd>{tempsoCase.client}</dd>
                                    </div>
                                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                                        <dt className="font-semibold">Year</dt>
                                        <dd>
                                            {tempsoCase.year}
                                        </dd>
                                    </div>
                                    {/* <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                                        <dt className="font-semibold">Service</dt>
                                        <dd>{caseStudy.service}</dd>
                                    </div> */}
                                </dl>
                            </div>
                        </Container>
                    </div>

                    <div className="border-y border-neutral-200 bg-neutral-100">
                        <div className="-my-px mx-auto max-w-[76rem] bg-neutral-200">
                            {/* <GrayscaleTransitionImage
                                {...caseStudy.image}
                                quality={90}
                                className="w-full"
                                sizes="(min-width: 1216px) 76rem, 100vw"
                                priority
                            /> */}
                        </div>
                    </div>
                </FadeIn>
            </header>

            {/* <Container className="mt-24 sm:mt-32 lg:mt-40">
                <FadeIn>
                    <MDXComponents.wrapper>{children}</MDXComponents.wrapper>
                </FadeIn>
            </Container> */}
        </article>
    )
}

export default Tempso


