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
import PluginImg2 from '@/images/work/bluecargo-plugin/screen-2.png'
import PluginImg3 from '@/images/work/bluecargo-plugin/screen-3.png'
import PluginImg4 from '@/images/work/bluecargo-plugin/screen-4.png'
import PluginImg7 from '@/images/work/bluecargo-plugin/screen-7.png'
import PluginImg8 from '@/images/work/bluecargo-plugin/screen-8.png'
import TaskFlow1 from '@/images/work/bluecargo-plugin/flow-chart-1.png'
import TaskFlow2 from '@/images/work/bluecargo-plugin/flow-chart-2.png'
import TaskFlow3 from '@/images/work/bluecargo-plugin/flow-chart-3.png'

import { SectionIntro } from '@/components/SectionIntro'
import { TagList, TagListItem } from '@/components/TagList'
import { StatList, StatListItem } from '@/components/StatList'
import { EnterPassword } from '@/components/EnterPassword'



const process = [{
    title: 'Research',
    items: ['On site and qualitative interviews', 'User pain points', 'Competitive audit'],
    gradient: 'from-indigo-50 to-sky-100'
}, {
    title: 'Analysis',
    items: ['Problem statement', 'Use cases', 'Executive summary'],
    gradient: 'from-indigo-50 to-sky-100'
}, {
    title: 'Ideation',
    items: ['Feature narrative', 'Design principles', 'Journey map & UX flow'],
    gradient: 'from-indigo-50 to-sky-100'
}, {
    title: 'Design',
    items: ['Low-fidelity wireframes', 'High-fidelity wireframes', 'Interactive prototypes'],
    gradient: 'from-indigo-50 to-sky-100'
}, {
    title: 'Feedback',
    items: ['Stakeholder reviews', 'Field training', 'Designer critiques'],
    gradient: 'from-indigo-50 to-sky-100'
}, {
    title: 'Iterations + handoff',
    items: ['Iterations', 'Detail fixing / copywriting', 'Asset & documentation for eng'],
    gradient: 'from-indigo-50 to-sky-100'
}]

const itemsTitleClass = 'font-medium mt-16 mb-4 text-[24px]'



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



const Shipment = () => {

    const caseStudy: ICaseStudy = caseStudies.find((study) => study.key === 'shipments') as ICaseStudy;


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
            <><Container>loading...</Container></>
        )
    }


    return (
        <>
            <Head>
                <title>{pageInformation[Routes.OutlookPlugin]!.title}</title>
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
                                        Offering supply chain clients a solution to track, monitor, and optimize their operations.</span>
                                    <Role />
                                    <Stats />
                                </Container>
                            </div>

                            {/* Objective */}
                            <div className='mt-48'>
                                <Container className='flex items-center'>
                                    <SectionIntro smaller={false} title='Objective'>
                                        <p>BlueCargo initially lacked a comprehensive product to fully meet the visibility and operational requirements of drayage carriers, brokers, freight forwarders, and beneficial cargo owners (BCOs).</p> <br />
                                        <p>The goal was to develop a product that delivers container tracking information, updates, alerts, and notifications, all enhanced by customized workflows and automations.</p>
                                    </SectionIntro>
                                </Container>
                            </div>

                            {/* Approach & Deliverables */}
                            <div className='mt-24'>
                                <Container className='flex items-center'>
                                    <SectionIntro smaller={false} title='Approach & Deliverables'>
                                        <p>When I joined BlueCargo as the third employee and lead designer in February 2021, the company lacked a container tracking product. My role was to design the comprehensive experience of monitoring containers from their port of origin to their destination port.</p>
                                        <br />
                                        <p>The BlueCargo Container Management Lifecycle product is the culmination of three years of customer-driven iterations aimed at enhancing the product, data quality, and refresh rates, ultimately making it indispensable for our customers.</p>
                                    </SectionIntro>
                                </Container>
                            </div>

                            {/* Process */}
                            <div className='mt-24'>
                                <Container className='flex items-center'>
                                    <SectionIntro smaller={false} title='Process' className='text-center'>
                                        <p className='text-center'>The process for this project includes the following:</p>
                                    </SectionIntro>
                                </Container>
                                <div className='flex flex-wrap justify-between items-top md:flex-row flex-col px-4 md:px-16 py-16'>

                                    {process.map((item, index) => {
                                        return (
                                            <div key={index} className='card w-full md:w-1/6 mb-4 md:mb-0 flex flex-col items-center p-4'>
                                                <div className={`w-full py-2 rounded-md text-sm text-neutral-950 font-semibold w-ful text-center bg-gradient-to-r ${item.gradient}`}>{item.title}</div>
                                                <ul className='mt-4'>
                                                    {item.items.map((el, i) => { return (<div key={i} className='text-xs text-neutral-600 text-center mt-2'>{el}</div>) })}
                                                </ul>
                                            </div>
                                        );
                                    })}


                                </div>
                            </div>

                            {/* Approach & Deliverables */}
                            <div className='mt-24'>
                                <Container className='flex items-center'>
                                    <SectionIntro smaller={false} title='Research'>

                                        <ul>
                                            <li>
                                                <h4 className={itemsTitleClass}>Context Study</h4>
                                                <p>While drayage carriers could track their containers' status by accessing terminal websites, brokers, freight forwarders, and BCOs have faced difficulties in receiving timely and accurate updates on container journey. </p>
                                                <br />
                                                <p>Even with terminal access, container tracking remains challenging and labor-intensive. The 2020 supply chain disruptions caused by the pandemic exacerbated these issues, turning the task of obtaining accurate and timely container updates into a near-nightmare. Supply chain operators were forced to manually track hundreds of containers daily across numerous terminal websites. Additionally, congestion and operational inefficiencies led to significant delays in pickups and returns, resulting in record-high detention and demurrage fees.</p>
                                            </li>
                                            <li>
                                                <h4 className={itemsTitleClass}>User pain points</h4>
                                                <p>Here are the core problems this product aims to address:</p>
                                                <br />
                                                <ul>
                                                    <li className='mb-8'>
                                                        <span className='font-bold'>Centralized Container Status Updates -</span> While drayage operators can access container status from multiple terminal websites, there is a need for a unified dashboard that consolidates and displays the latest updates from all terminals.
                                                    </li>
                                                    <li className='mb-8'>
                                                        <span className='font-bold'>Exception-Based Container Management -</span>Supply chain professionals need to swiftly identify containers that are problematic, such as those incurring fees or not picked up or returned on time at the terminal.
                                                    </li>
                                                    <li className='mb-8'>
                                                        <span className='font-bold'>Customized Alerts & Notifications -</span>For large BCOs managing operations across multiple ports, a centralized container view can still be overwhelming. These companies require tailored notifications to inform the appropriate teams (usually segmented by port) about containers with issues.
                                                    </li>
                                                    <li className='mb-8'>
                                                        <span className='font-bold'>On-the-Fly Extension Requests -</span>BCOs and drayage carriers often need to automatically notify terminals or steamship lines about problematic containers and request last-minute extensions for free days if delays are caused by port or terminal restrictions.
                                                    </li>
                                                    <li className='mb-8'>
                                                        <span className='font-bold'>Aggregated Supply Chain Metrics -</span>Supply chain professionals often lack visibility into their current, past, and projected supply chain costs due to insufficient tracking of problematic containers. This product aims to provide comprehensive metrics to illuminate these costs.
                                                    </li>
                                                </ul>


                                            </li>
                                        </ul>

                                    </SectionIntro>
                                </Container>
                            </div>
                        </FadeIn>
                    </header>
                </article >
            }

        </>
    )
}


{/* <Container>
<GrayscaleTransitionImage
    src={PluginImg8}
    quality={90}
    sizes="(min-width: 1216px) 76rem, 100vw"
    priority
    className="rounded-md mb-24"
/>
</Container> */}


// export async function getServerSideProps() {

//     const cookieStore = cookies()
//     const storedPassword = "Pacman";
//     let password = cookieStore.get('password')
//     console.log(password)

//     return {
//         props: {}, // will be passed to the page component as props
//     }
// }


export default Shipment



