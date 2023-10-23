import { pageInformation, Routes } from '../../constant/allPages'
import Head from 'next/head'
import React from 'react'
import { caseStudies } from '@/constant/caseStudy'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { PageIntro } from '@/components/PageIntro'
import { ICaseStudy } from '@/types/ICaseStudy'
import { PageLinks } from '@/components/PageLinks'
import PluginImg2 from '@/images/work/bluecargo-plugin/screen-2.png'
import PluginImg3 from '@/images/work/bluecargo-plugin/screen-3.png'
import PluginImg7 from '@/images/work/bluecargo-plugin/screen-7.png'
import PluginImg8 from '@/images/work/bluecargo-plugin/screen-8.png'
import TaskFlow1 from '@/images/work/bluecargo-plugin/flow-chart-1.png'
import TaskFlow2 from '@/images/work/bluecargo-plugin/flow-chart-2.png'
import TaskFlow3 from '@/images/work/bluecargo-plugin/flow-chart-3.png'

import { SectionIntro } from '@/components/SectionIntro'
import { TagList, TagListItem } from '@/components/TagList'
import { List, ListItem } from '@/components/List'
import { StatList, StatListItem } from '@/components/StatList'



const Role = () => {
    return (

        <div className='flex flex-col items-center mt-24'>
            <h3 className='font-bold'>
                My Role
            </h3>
            <TagList className="mt-4">
                <TagListItem>User interviews</TagListItem>
                <TagListItem>Flow charts</TagListItem>
                <TagListItem>Wireframes</TagListItem>
                <TagListItem>Prototyping</TagListItem>
                <TagListItem>UI design</TagListItem>
                <TagListItem>Analytics</TagListItem>
            </TagList>
        </div>
    )
}

const Stats = () => {
    return (
        <div>
            <div className='p-8 border border-gray-100 bg-gray-50 mt-24'>
                <StatList>
                    <StatListItem value="+20%" label="Increase of BlueCargo MAUs for this feature" />
                    <StatListItem value="+10" label="New enterprise client converted" />
                    <StatListItem value="-2hrs" label="Decreased design to dev handoff time" />
                </StatList>
            </div>
        </div>
    )
}



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
                                <span
                                    className=
                                    'text-center block font-display tracking-tight [text-wrap:balance] text-4xl font-medium sm:text-5xl text-neutral-950'
                                >
                                    Empowering supply chain customer service reps in Outlook for container status updates and fee disputes
                                </span>
                                <Role />
                                <Stats />
                            </Container>
                        </div>

                        <div className='mt-48'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title='Context'>
                                    <p>At BlueCargo, our primary client base consists of customer service representatives who rely on Microsoft Outlook for their daily tasks. They often send emails to share container status updates or dispute container fees with steamship lines on behalf of clients. </p>
                                </SectionIntro>
                            </Container>
                        </div>
                        <div className='mt-24'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title='Research'>
                                    <p>While conducting usability reviews with users of BlueCargo`&apos;`s container tracking and fee dispute tools, it became evident that users frequently had to switch between platforms to complete their tasks.</p>
                                    <p className='text-base mt-16 mb-4 font-bold'>Web app task flow</p>
                                </SectionIntro>
                            </Container>
                            <Container>
                                <GrayscaleTransitionImage
                                    src={TaskFlow1}
                                    quality={90}
                                    sizes="(min-width: 1216px) 76rem, 100vw"
                                    priority
                                    className="rounded-md"
                                />
                            </Container>

                            <Container className='flex items-center'>
                                <SectionIntro smaller={true}>
                                    <p className='my-24'>I decided to enroll 5 alpha customers in an experiment to explore an alternative flow, through an Outlook plugin, which would remove the need to switch apps so often.</p>
                                    <p className='text-base mt-16 mb-4 font-bold'>Outlook plugin task flow</p>
                                </SectionIntro>
                            </Container>

                            <Container>
                                <GrayscaleTransitionImage
                                    src={TaskFlow2}
                                    quality={90}
                                    sizes="(min-width: 1216px) 76rem, 100vw"
                                    priority
                                    className="rounded-md"
                                />
                            </Container>

                            <Container className='flex items-center'>
                                <SectionIntro smaller={true}>
                                    <p className='mb-16 mt-16'>I tested this flow through discovery interviews with the alpha customers. The response was very positive. It appeared that customers were excited about reducing the need for context switching and dealing with multiple platforms. They estimated that they could save up to 5 minutes for each dispute thanks to the plugin. The product team decided to move forward with the project and build the feature.</p>
                                    <p className='mb-16'>In order to prepare for it, I referenced all the screens that I would need to design. Most of the component would be reused from the web app for consistency and development speed.</p>
                                </SectionIntro>
                            </Container>

                            <Container>
                                <GrayscaleTransitionImage
                                    src={TaskFlow3}
                                    quality={90}
                                    sizes="(min-width: 1216px) 76rem, 100vw"
                                    priority
                                    className="rounded-md mb-24"
                                />
                            </Container>

                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title='User interface and prototyping'>
                                    <p className='mb-16 mt-16'>The main user interface challenge was to adapt the web development to a much narrower window for the plugin (w:400px, height: 813px). Most of the components already existed in the web app and could be reused by applying basic responsiveness behavior. </p>
                                </SectionIntro>
                            </Container>

                            <Container>
                                <div className="md:flex md:space-x-16">
                                    <div className='w-4/6'>
                                        <h6 className='mb-4 font-bold'>Desktop app form</h6>
                                        <GrayscaleTransitionImage
                                            src={PluginImg2}
                                            quality={90}
                                            sizes="(min-width: 1216px) 76rem, 100vw"
                                            priority
                                            className="rounded-md mb-24"
                                        />
                                    </div>
                                    <div className='w-2/6'>
                                        <h6 className='mb-4 font-bold'>Outlook plugin form</h6>
                                        <GrayscaleTransitionImage
                                            src={PluginImg3}
                                            quality={90}
                                            sizes="(min-width: 1216px) 76rem, 100vw"
                                            priority
                                            className="rounded-md mb-24"
                                        />
                                    </div>
                                </div>
                            </Container>

                            <Container className='flex items-center'>
                                <SectionIntro smaller={false}>
                                    <p className='mb-16'>I then build a basic prototype to illustrate with high-fidelity mockups how a customer would dispute a per diem invoice with the plugin and ran additional usability studies.</p>
                                    <p className='mb-16 font-bold'>While engaging with our alpha customers we were surprised to see how exited they were to use the plugin to process and dispute their per diem invoices.</p>
                                    <p className='mb-16'>We published and released the plugin on the microsoft store and advertised it to our existing customers.
                                    </p>
                                </SectionIntro>
                            </Container>

                            <Container>
                                <GrayscaleTransitionImage
                                    src={PluginImg7}
                                    quality={90}
                                    sizes="(min-width: 1216px) 76rem, 100vw"
                                    priority
                                    className="rounded-md mb-24"
                                />
                            </Container>

                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title='Design system'>
                                    <p className='mb-16 mt-16'>The complex nature of the plugin necessitated 12 screens covering login, error states, paywal, invoice mapping, dispute detail and overview.</p>
                                    <p className='mb-16'>To maintain consistency and ensure efficient design to dev handover, the web component library was adapted to the plugin:</p>
                                </SectionIntro>
                            </Container>

                            <Container>
                                <GrayscaleTransitionImage
                                    src={PluginImg8}
                                    quality={90}
                                    sizes="(min-width: 1216px) 76rem, 100vw"
                                    priority
                                    className="rounded-md mb-24"
                                />
                            </Container>

                        </div>
                    </FadeIn>
                </header>
            </article >
        </>
    )
}

export default Plugin