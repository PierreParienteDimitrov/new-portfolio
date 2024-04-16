"use client"

import { pageInformation, Routes } from '../../constant/allPages'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { caseStudies } from '@/constant/caseStudy'


import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { MDXComponents } from '@/components/MDXComponents'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { ICaseStudy } from '@/types/ICaseStudy'
import { Loading } from '@/components/Loading'
import { EnterPassword } from '@/components/EnterPassword'





const CaseStudy = () => {
    const caseStudy: ICaseStudy = caseStudies.find((study) => study.key === 'spectrum') as ICaseStudy;


    const [showForm, setShowForm] = useState(true)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)

        fetch('/api/password', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((data) => {
                setLoading(false)
                if (!data.isValidated) {
                    setShowForm(false)
                }
            })
            .catch((error) => {
                console.error(error);
            });


    }, [showForm]);



    if (loading) {
        return (
            <Loading />
        )
    }


    return (
        <>

            <Head>
                <title>{pageInformation[Routes.Spectrum]!.title}</title>
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

            {showForm ? <EnterPassword /> :
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
                    <FadeIn>
                        <div className='flex justify-center w-full py-16'><h1 className='text-[32px]'>Full case study coming soon</h1></div>
                    </FadeIn>

                    {/* <Container className="mt-24 sm:mt-32 lg:mt-40">
                <FadeIn>
                    <MDXComponents.wrapper>{children}</MDXComponents.wrapper>
                </FadeIn>
            </Container> */}
                    <ContactSection />
                </article>
            }
        </>
    )
}

export default CaseStudy


