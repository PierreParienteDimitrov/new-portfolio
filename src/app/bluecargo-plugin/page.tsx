import { pageInformation, Routes } from '../../constant/allPages'
import Head from 'next/head'
import React from 'react'
import { caseStudies } from '@/constant/caseStudy'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { ICaseStudy } from '@/types/ICaseStudy'
import Carousel from '@/components/Carousel'
import { ICarousel } from '@/types/ICarousel'
import PluginImg1 from '@/images/work/bluecargo-plugin/screen-5.png'
import PluginImg2 from '@/images/work/bluecargo-plugin/screen-6.png'
import PluginImg3 from '@/images/work/bluecargo-plugin/screen-7.png'





const PLUGIN_IMG: ICarousel[] = [
    {
        title: 'plugin1',
        src: PluginImg1,
        alt: 'alt1',
    },
    {
        title: 'plugin2',
        src: PluginImg2,
        alt: 'alt1',
    },
    {
        title: 'plugin3',
        src: PluginImg3,
        alt: 'alt3',
    },
]


const Plugin = () => {
    const caseStudy: ICaseStudy = caseStudies.find((study) => study.key === 'bluecargo_plugin') as ICaseStudy;

    return (
        <>
            <Head>
                <title>{pageInformation[Routes.Plugin]!.title}</title>
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
                            </Container>
                        </div>

                        <div className="border-y border-neutral-200 bg-neutral-100">
                            <div className="-my-px mx-auto max-w-[76rem] bg-neutral-200">

                                <Carousel carouselItems={PLUGIN_IMG} />

                            </div>
                        </div>
                    </FadeIn>
                </header>

                {/* <Container className="mt-24 sm:mt-32 lg:mt-40">
                <FadeIn>
                    <MDXComponents.wrapper>{children}</MDXComponents.wrapper>
                </FadeIn>
            </Container> */}
            </article >
        </>
    )
}

export default Plugin