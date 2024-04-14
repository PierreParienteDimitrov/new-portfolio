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
import Icon1 from '@/images/work/shipments/icon-01.svg'
import Icon2 from '@/images/work/shipments/icon-02.svg'
import Icon3 from '@/images/work/shipments/icon-03.svg'
import Icon4 from '@/images/work/shipments/icon-04.svg'
import Icon5 from '@/images/work/shipments/icon-05.svg'
import Icon6 from '@/images/work/shipments/icon-06.svg'
import Icon7 from '@/images/work/shipments/icon-07.svg'
import Icon8 from '@/images/work/shipments/icon-08.svg'
import FlowChart from '@/images/work/shipments/flow-chart.svg'


import { SectionIntro } from '@/components/SectionIntro'
import { TagList, TagListItem } from '@/components/TagList'
import { StatList, StatListItem } from '@/components/StatList'
import { EnterPassword } from '@/components/EnterPassword'
import { List, ListItem } from '@/components/List'



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
    items: ['Design principles', 'Feature narrative', 'Journey map & UX flow'],
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

const useCases = [{
    quote: 'I need to track my incoming loads to effectively adjust my capacity.',
    img: Icon1
}, {
    quote: 'I want to prioritize my containers with issues.',
    img: Icon2
}, {
    quote: 'I need to alert the relevant teams before issues arise.',
    img: Icon3
}, {
    quote: 'I need to document my container journey to support my requests for last free day extensions and to assist with fee audits and mitigation.',
    img: Icon4
}, {
    quote: 'I need to know past, current, and projected future detention and demurrage fees.',
    img: Icon5
},]

const designPrinciples = [{
    title: 'Intuitive',
    description: 'The experience should be intuitive. Every interaction should feel natural, and all information should be presented with maximum clarity, conciseness, and simplicity.',
    img: Icon8
}, {
    title: 'Flexible',
    description: 'The experience should offer customer customization, enabling each client to tailor the product to their specific operations and needs.',
    img: Icon6
}, {
    title: 'Standardization',
    description: 'The product should include a set of best practice template flows, enabling users to derive immediate value without extensive customization.',
    img: Icon7
},]

const featureNarrative = [{
    title: '1. Manual or Automated Upload',
    description: 'Users can initiate data collection and tracking by uploading the container’s bill of lading either manually or automatically.'
},
{
    title: '2. Container Status Tracking',
    description: 'This feature allows users to monitor all their shipments from a single, unified view.'
},
{
    title: '3. Customized Views',
    description: 'Users can tailor views based on their operational priorities to focus on what matters most.'
},
{
    title: '4. Workflow Center',
    description: 'This facilitates the creation of alerts and automations for a selected subset of containers, accelerating the resolution of issues.'
},
{
    title: '5. Customizable Centralized Dashboard',
    description: 'This dashboard aggregates data and serves as the primary interface for the product, enabling users to quickly assess key metrics and take action.'
},]

const flow = [{
    title: '1. Data Integration Modality',
    description: 'This includes options for either manual or automated Bill of Lading (BOL) ingestion, allowing for flexible data entry tailored to different operational needs.'
},
{
    title: '2. Container Tagging',
    description: 'Customers can attach metadata to their containers, enabling efficient sorting and retrieval of specific information according to their requirements.'
},
{
    title: '3. Handling Edge Cases',
    description: 'The system is designed to manage edge cases, such as duplicates in BOL entries and uploads in invalid formats, ensuring data integrity and usability.'
},
{
    title: '4. Automation Templates Based on Personas',
    description: 'Templates are crafted to cater to the distinct needs of different user personas, streamlining workflows and enhancing productivity by automating routine tasks based on user role and function.'
},]




const itemsTitleClass = 'font-bold my-4'



const Role = () => {
    return (

        <div className='flex flex-col items-center mt-12'>
            <h3 className='font-bold text-neutral-950'>
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
                    <StatListItem value="+200" label="Companies using the system every day" />
                    <StatListItem value="60k" label="Container tracked every week" />
                    <StatListItem value="-2hrs" label="Time saving to track containers" />
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
                            <h3>{caseStudy.description}</h3>
                        </PageIntro>

                        <FadeIn>
                            {/* Case intro */}
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

                            {/* Tagline */}
                            <div className='mt-24'>
                                <Container>
                                    <h2
                                        className=
                                        'text-center block font-display [text-wrap:balance] font-medium text-neutral-950'
                                    >
                                        Offering supply chain clients a solution to track, monitor, and optimize their operations.</h2>
                                    <Role />
                                    <Stats />
                                </Container>
                            </div>

                            {/* Objective */}
                            <div className='mt-48'>
                                <Container className='flex items-center'>
                                    <SectionIntro smaller={true} title='Objective'>
                                        <p>BlueCargo initially lacked a comprehensive product to fully meet the visibility and operational requirements of drayage carriers, brokers, freight forwarders, and beneficial cargo owners (BCOs).</p> <br />
                                        <p>The goal was to develop a product that delivers container tracking information, updates, alerts, and notifications, all enhanced by customized workflows and automations.</p>
                                    </SectionIntro>
                                </Container>
                            </div>

                            {/* Approach & Deliverables */}
                            <div className='mt-24'>
                                <Container className='flex items-center'>
                                    <SectionIntro smaller={true} title='Approach & Deliverables'>
                                        <p>When I joined BlueCargo as the third employee and lead designer in February 2021, the company lacked a container tracking product. My role was to design the comprehensive experience of monitoring containers from their port of origin to their destination port.</p>
                                        <br />
                                        <p>The BlueCargo Container Management Lifecycle product is the culmination of three years of customer-driven iterations aimed at enhancing the product, data quality, and refresh rates, ultimately making it indispensable for our customers.</p>
                                    </SectionIntro>
                                </Container>
                            </div>

                            {/* Process */}
                            <div className='mt-24'>
                                <Container className='flex'>
                                    <SectionIntro smaller={true} title='Process'>
                                        <p>The process for this project encompasses six distinct steps, ranging from initial research and discovery through to the creation of high-fidelity mockups and engineering documentation. This includes wireframing and multiple iterations to refine the product.</p>
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

                            {/* Research */}
                            <div className='mt-24'>
                                <Container className='flex items-center'>
                                    <SectionIntro smaller={true} title='Research'>
                                        <p className={itemsTitleClass}>Context Study</p>
                                        <p>While drayage carriers could track their containers’ status by accessing terminal websites, brokers, freight forwarders, and BCOs have faced difficulties in receiving timely and accurate updates on container journey. </p>
                                        <br />
                                        <p>Even with terminal access, container tracking remains challenging and labor-intensive. The 2020 supply chain disruptions caused by the pandemic exacerbated these issues, turning the task of obtaining accurate and timely container updates into a near-nightmare. Supply chain operators were forced to manually track hundreds of containers daily across numerous terminal websites. Additionally, congestion and operational inefficiencies led to significant delays in pickups and returns, resulting in record-high detention and demurrage fees.</p>
                                        <br />
                                        <br />
                                        <p className={itemsTitleClass}>User pain points</p>
                                        <p>Here are the core problems this product aims to address:</p>
                                        <br />
                                        <List className="mt-16 lg:mt-0 lg:min-w-[33rem]">
                                            <ListItem title="Centralized Container Status Updates">
                                                While drayage operators can access container status from multiple terminal websites, there is a need for a unified dashboard that consolidates and displays the latest updates from all terminals.
                                            </ListItem>
                                            <ListItem title="Exception-Based Container Management">
                                                Supply chain professionals need to swiftly identify containers that are problematic, such as those incurring fees or not picked up or returned on time at the terminal.
                                            </ListItem>
                                            <ListItem title="Customized Alerts & Notifications">
                                                For large BCOs managing operations across multiple ports, a centralized container view can still be overwhelming. These companies require tailored notifications to inform the appropriate teams (usually segmented by port) about containers with issues.
                                            </ListItem>
                                            <ListItem title="On-the-Fly Extension Requests">
                                                BCOs and drayage carriers often need to automatically notify terminals or steamship lines about problematic containers and request last-minute extensions for free days if delays are caused by port or terminal restrictions.
                                            </ListItem>
                                            <ListItem title="Aggregated Supply Chain Metrics">
                                                Supply chain professionals often lack visibility into their current, past, and projected supply chain costs due to insufficient tracking of problematic containers. This product aims to provide comprehensive metrics to illuminate these costs.
                                            </ListItem>
                                        </List>
                                    </SectionIntro>
                                </Container>
                            </div>

                            {/* Analysis */}
                            <div className='mt-24'>
                                <Container className='flex items-center'>
                                    <SectionIntro smaller={true} title='Analysis'>
                                        <p className={itemsTitleClass}>Problem statement</p>
                                        <p>BlueCargo lacked a container management lifecycle product that meets the visibility, customization, and operational needs of most supply chain professionals.</p>
                                        <br />
                                        <br />
                                        <p className={itemsTitleClass}>Use cases</p>
                                        <List className="mt-16 lg:mt-0 lg:min-w-[33rem]">
                                            {useCases.map((item, index) => {
                                                return (
                                                    <ListItem key={index}>
                                                        <div className='flex space-x-8 w-full items-center'>
                                                            <div className='w-[80px]'>
                                                                <GrayscaleTransitionImage
                                                                    src={item.img}
                                                                    quality={90}
                                                                    className='w-16 h-16' priority
                                                                />
                                                            </div>
                                                            <div className='w-full'>
                                                                <p className='italic'>
                                                                    ’{item.quote}’
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </ListItem>

                                                );
                                            })}
                                        </List>
                                        <br />
                                        <br />
                                        <p className={itemsTitleClass}>Executive Summary</p>
                                        <p>The BlueCargo Container Management Lifecycle will deliver reliable, adaptable, and actionable insights into shipments, enhancing the operational efficiency of supply chain actors.</p>
                                    </SectionIntro>
                                </Container>
                            </div>

                            {/* Ideation */}
                            <div className='mt-24'>
                                {/* Design principles */}
                                <Container className='flex items-start'>
                                    <SectionIntro smaller={false} title='Ideation'>
                                        <p className={itemsTitleClass}>Design principles</p>
                                        <p>
                                            The supply chain industry is inherently complex and diverse. While established best practices and industry standards exist, the processes, team organization, and operations management often vary significantly from one company to another.
                                        </p>
                                        <br />
                                        <p>
                                            Consequently, the design principles for this project aim to adhere to industry codes by offering pre-designed workflow templates. Additionally, they ensure a degree of customization, allowing the product to be adaptable to the unique needs of different companies.
                                        </p>

                                    </SectionIntro>
                                </Container>
                                <div className='flex flex-wrap justify-between items-top md:flex-row flex-col px-4 md:px-16 py-16'>
                                    {designPrinciples.map((item, index) => {
                                        return (
                                            <div key={index} className='card w-full md:w-1/3 mb-4 md:mb-0 flex flex-col items-center p-4 text-center'>
                                                <div className=''>
                                                    <GrayscaleTransitionImage
                                                        src={item.img}
                                                        quality={90}
                                                        className='w-16 h-16 mb-4' priority
                                                    />
                                                </div>
                                                <p className="font-medium text-neutral-700">
                                                    {item.title}
                                                </p>
                                                <h5 className="text-neutral-600 mt-2">
                                                    {item.description}
                                                </h5>
                                            </div>
                                        );
                                    })}


                                </div>

                                {/* Feature narrative */}
                                <Container className='flex items-center'>
                                    <SectionIntro smaller={false} title=''>
                                        <p className={itemsTitleClass}>Feature narrative</p>
                                        <p>Create a Container Management Lifecycle experience that enables users to track, record, and take actions on shipments based on exceptions. The key elements of the user journey include:</p>
                                        <List className="my-16 lg:min-w-[33rem]">
                                            {featureNarrative.map((item, index) => {
                                                return (
                                                    <ListItem title={item.title} key={index}>
                                                        {item.description}
                                                    </ListItem>

                                                );
                                            })}
                                        </List>
                                        <br /><br />

                                        <p className={itemsTitleClass}>Journey map UX flow</p>
                                        <p>Based on the feature narrative, I constructed the user experience flow, considering the following:</p>
                                        <List className="my-16 lg:min-w-[33rem]">
                                            {flow.map((item, index) => {
                                                return (
                                                    <ListItem title={item.title} key={index}>
                                                        {item.description}
                                                    </ListItem>

                                                );
                                            })}
                                        </List>
                                        <br /><br />
                                        <GrayscaleTransitionImage
                                            src={FlowChart}
                                            quality={90}
                                            sizes="(min-width: 1216px) 76rem, 100vw"
                                            priority
                                            className="rounded-md"
                                        />
                                    </SectionIntro>
                                </Container>
                            </div>
                        </FadeIn>
                    </header >
                </article >
            }

        </>
    )
}



export default Shipment



