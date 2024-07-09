import { pageInformation, Routes } from '../../constant/allPages'
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
import UIShot1 from '@/images/UI Shots/ui-shot-1.png'
import UIShot2 from '@/images/UI Shots/ui-shot-2.png'
import UIShot3 from '@/images/UI Shots/ui-shot-3.png'
import UIShot4 from '@/images/UI Shots/ui-shot-4.png'
import UIShot5 from '@/images/UI Shots/ui-shot-5.png'
import UIShot6 from '@/images/UI Shots/ui-shot-6.png'
import UIShot7 from '@/images/UI Shots/ui-shot-7.png'





const CaseStudy = () => {
    const caseStudy: ICaseStudy = caseStudies.find((study) => study.key === 'ui_shots') as ICaseStudy;

    const shots = [UIShot1, UIShot2, UIShot3, UIShot4, UIShot5, UIShot6, UIShot7]


    return (
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
                        </Container>
                    </div>

                    <Container>
                        <div className='flex justify-center flex-col px-4 md:px-16 py-4'>
                            {shots.map((item, index) => {
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
        </article>
    )
}

export default CaseStudy


