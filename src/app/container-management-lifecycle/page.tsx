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
import FlowChart from '@/images/work/shipments/flow-chart.svg'
import DataFilters from '@/images/work/shipments/data-filters.png'
import { SectionIntro } from '@/components/SectionIntro'
import { TagList, TagListItem } from '@/components/TagList'
import { StatList, StatListItem } from '@/components/StatList'
import { EnterPassword } from '@/components/EnterPassword'
import { List, ListItem } from '@/components/List'
import { process, useCases, designPrinciples, featureNarrative, flow, dataIngestion, dataVisualization, workflow, dashboard } from '@/constant/containerManagement'
import { ContactSection } from '@/components/ContactSection'
import { Loading } from '@/components/Loading'

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
                                    <p>When I joined BlueCargo as the first employee and founding designer in February 2021, the company lacked a container tracking product. My role was to design the comprehensive experience of monitoring containers from their port of origin to their destination port.</p>
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
                            {/* Data architecture */}
                            <Container className='flex items-center mt-24'>
                                <SectionIntro smaller={false} title=''>
                                    <p className={itemsTitleClass}>Data architecture</p>
                                    <p>I designed the data architecture for the container watchlist table, utilizing the data collected by the product. I organized the filters by category and defined the search parameters for each one to enhance usability and efficiency.
                                    </p>
                                </SectionIntro>
                            </Container>
                            <div className='px-4 md:px-16 py-16'>
                                <GrayscaleTransitionImage
                                    src={DataFilters}
                                    quality={90}
                                    sizes="(min-width: 1216px) 76rem, 100vw"
                                    priority
                                    className="rounded-md"
                                />
                            </div>
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

                        {/* Design */}
                        <div className='mt-24'>
                            {/* Data ingestion */}
                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title='Design'>
                                    <p className={itemsTitleClass}>Data ingestion</p>
                                    <p>
                                        The data ingestion screens enable users to manually upload one or multiple files and monitor the status of these uploads. Additionally, I have designed a comprehensive experience that allows users to tag containers with additional metadata at the point of upload, tailoring the experience to meet specific business needs of each customer.
                                    </p>
                                    <br /><br />
                                </SectionIntro>
                            </Container>
                            <Container>
                                <div className='flex justify-center flex-col px-4 md:px-16 py-4'>

                                    {dataIngestion.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <p className='text-center my-4 text-neutral-700 font-medium'>
                                                    {item.label}
                                                </p>
                                                <article className="relative flex w-full flex-col rounded-3xl ring-1 ring-neutral-300 transition hover:bg-neutral-50 overflow-hidden mb-8" >
                                                    <GrayscaleTransitionImage
                                                        src={item.img}
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

                            {/* Data vizualisation */}
                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title=''>
                                    <p className={itemsTitleClass}>Data visualization</p>
                                    <p>
                                        The data visualization screens provide users with a comprehensive view of all their tracked shipments. A set of pre-built template views is available to allow customers to quickly begin utilizing the product. Additionally, customers have the option to create custom views that align with their internal processes, enhancing usability and relevance.
                                    </p>
                                    <br /><br />
                                </SectionIntro>
                            </Container>
                            <Container>
                                <div className='flex justify-center flex-col px-4 md:px-16 py-4'>
                                    {dataVisualization.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <p className='text-center my-4 text-neutral-700 font-medium'>
                                                    {item.label}
                                                </p>
                                                <article className="relative flex w-full flex-col rounded-3xl ring-1 ring-neutral-300 transition hover:bg-neutral-50 overflow-hidden mb-8">
                                                    <GrayscaleTransitionImage
                                                        src={item.img}
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

                            {/* Actions */}
                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title=''>
                                    <p className={itemsTitleClass}>Actions</p>
                                    <p>
                                        The workflow actions screens enable users to utilize one of the available filtered views or create a new set of filters to define actions based on their selections. For example, a BCO can automate a last free day extension request to the terminal by selecting a specific set of filters and setting up an email automation to send daily notifications to the terminal clerk. This feature reduces manual tasks and decreases the total cost per shipment through an efficient fee mitigation process.</p>
                                    <br /><br />
                                </SectionIntro>
                            </Container>
                            <Container>
                                <div className='flex justify-center flex-col px-4 md:px-16 py-4'>
                                    {workflow.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <p className='text-center my-4 text-neutral-700 font-medium'>
                                                    {item.label}
                                                </p>
                                                <article className="relative flex w-full flex-col rounded-3xl ring-1 ring-neutral-300 transition hover:bg-neutral-50 overflow-hidden mb-8" >
                                                    <GrayscaleTransitionImage
                                                        src={item.img}
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

                            {/* Dashboard */}
                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title=''>
                                    <p className={itemsTitleClass}>Dashboard</p>
                                    <p>
                                        The dashboard screen acts as the primary entry point to the product. It succinctly presents the most crucial aggregated data to the customer, enabling them to prioritize tasks and gain a high-level understanding of their operations.
                                    </p>
                                    <br /><br />
                                </SectionIntro>
                            </Container>
                            <Container>
                                <div className='flex justify-center flex-col px-4 md:px-16 py-4'>
                                    {dashboard.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <p className='text-center my-4 text-neutral-700 font-medium'>
                                                    {item.label}
                                                </p>
                                                <article className="relative flex w-full flex-col rounded-3xl ring-1 ring-neutral-300 transition hover:bg-neutral-50 overflow-hidden mb-8" >
                                                    <GrayscaleTransitionImage
                                                        src={item.img}
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
                        </div>

                        {/* Conclusion */}
                        <div className='mt-24'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={true} title='Conclusion'>
                                    <p>Over the past three years, the BlueCargo container lifecycle management platform has emerged as a new industry standard for drayage carriers and beneficial cargo owners (BCOs). The product enhances efficiency for supply chain teams by enabling them to manage shipments by exceptions, focusing on containers that may cause delays or incur fees. This targeted approach has saved the industry millions in detention and demurrage fees.
                                    </p>
                                    <br />
                                    <h2 className='mt-32'>Thank you for reading!</h2>
                                </SectionIntro>
                            </Container>
                        </div>


                    </FadeIn>
                </header >
                <ContactSection />
            </article >


        </>
    )
}

export default Shipment



