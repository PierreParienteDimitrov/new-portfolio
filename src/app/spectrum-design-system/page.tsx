"use client"

import { pageInformation, Routes } from '../../constant/allPages'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { caseStudies } from '@/constant/caseStudy'


import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { PageIntro } from '@/components/PageIntro'
import { ICaseStudy } from '@/types/ICaseStudy'
import { Loading } from '@/components/Loading'
import { EnterPassword } from '@/components/EnterPassword'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { process, deliverables, interviews, painPoints, design } from '@/constant/spectrum'
import { StatList, StatListItem } from '@/components/StatList'
import { TagList, TagListItem } from '@/components/TagList'


const itemsTitleClass = 'font-bold my-4'


const Role = () => {
    return (

        <div className='flex flex-col items-center mt-12'>
            <h3 className='font-bold text-neutral-950'>
                My Role
            </h3>
            <TagList className="mt-4">
                <TagListItem>Research & Analysis</TagListItem>
                <TagListItem>Component architecture</TagListItem>
                <TagListItem>Library organization</TagListItem>
                <TagListItem>Cross-platform rules</TagListItem>
            </TagList>
        </div>
    )
}

const Stats = () => {
    return (
        <div>
            <div className='p-8 border border-gray-100 bg-gray-50 mt-24'>
                <StatList>
                    <StatListItem value="6" label="Platforms supported" />
                    <StatListItem value="+20" label="Designers directly impacted" />
                    <StatListItem value="1" label="Year of work" />
                </StatList>
            </div>
        </div>
    )
}





const CaseStudy = () => {
    const caseStudy: ICaseStudy = caseStudies.find((study) => study.key === 'spectrum') as ICaseStudy;


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
                                    Rebuilding a design system of all TV platforms - Web, Mobile, Roku, Xbox, Apple TV, Android TV.
                                </h2>
                                <h4 className='text-center mt-8 mb-24 text-neutral-500'>Spectrum TV is an on-demand and streaming video platform used by millions of Americans. I was hired to transition the design assets from Sketch to Figma and to update or rebuild the component library for all TV platforms, including Xbox, Roku, Apple TV, Android TV, Web, and Mobile.</h4>
                                <Role />
                                <Stats />
                            </Container>
                        </div>

                        {/* Objective */}
                        <div className='mt-48'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={true} title='Objective'>
                                    <p>The design team management decided to transition from Sketch to Figma and rebuild the design system and component library within Figma. The underlying objectives were to speed up team collaboration and create a consistent and flexible system that allows for fast iterations.</p> <br />
                                </SectionIntro>
                            </Container>
                        </div>

                        {/* Deliverables */}
                        <div className='mt-24'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={true} title='Deliverables'>
                                    <p>By the end of my contract, I delivered a comprehensive component library and design system that included:</p>
                                    <br /><br />
                                    <List className="mt-16 lg:mt-0 lg:min-w-[33rem]">
                                        {deliverables.map((item, index) => {
                                            return (
                                                <ListItem key={index}>
                                                    <div className='flex space-x-8 w-full items-center'>
                                                        {/* <div className='w-[80px]'>
                                                                <GrayscaleTransitionImage
                                                                    src={item.img}
                                                                    quality={90}
                                                                    className='w-16 h-16' priority
                                                                />
                                                            </div> */}
                                                        <div className='w-full'>
                                                            <p>
                                                                {item.item}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </SectionIntro>
                            </Container>
                        </div>

                        {/* Process */}
                        <div className='mt-24'>
                            <Container className='flex'>
                                <SectionIntro smaller={true} title='Process'>
                                    <p>The process for this project includes the following: </p>
                                </SectionIntro>
                            </Container>
                            <div className='flex flex-wrap space-x-12 items-top justify-center md:flex-row flex-col px-4 md:px-16 py-16'>

                                {process.map((item, index) => {
                                    return (
                                        <div key={index} className='card w-full md:w-1/3 mb-4 md:mb-0 flex flex-col items-center p-4'>
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
                                    <p className={itemsTitleClass}>Review</p>
                                    <p>My initial task was to analyze the legacy design system that was created in Sketch a few years ago. Due to Figma’s features and its newly released capabilities, such as frames, variants, nested properties, and variables, almost all the components needed to be rebuilt. This rebuilding process required a complete reorganization of the component library and redesign of the design system architecture.</p>
                                    <br />
                                    <p>Due to these factors, I quickly decided against importing the raw Sketch files directly into Figma.</p>
                                    <br />
                                    <br />
                                </SectionIntro>
                            </Container>
                            {/* Interview */}
                            <Container className='flex items-center mt-24'>
                                <SectionIntro smaller={false} title=''>
                                    <p className={itemsTitleClass}>Interviews</p>
                                    <p>While reviewing the Sketch files, I also scheduled interviews with the lead designers across different platforms to better understand their tasks and empathize with their work. It became clear that most of their efforts were focused on:
                                    </p>
                                    <br /><br />
                                    <List className="mt-16 lg:mt-0 lg:min-w-[33rem]">
                                        {interviews.map((item, index) => {
                                            return (
                                                <ListItem key={index}>
                                                    <div className='flex space-x-8 w-full items-center'>
                                                        {/* <div className='w-[80px]'>
                                                                <GrayscaleTransitionImage
                                                                    src={item.img}
                                                                    quality={90}
                                                                    className='w-16 h-16' priority
                                                                />
                                                            </div> */}
                                                        <div className='w-full'>
                                                            <p>
                                                                {item.item}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </SectionIntro>
                            </Container>
                            {/* Pain points */}
                            <Container className='flex items-center mt-24'>
                                <SectionIntro smaller={false} title=''>
                                    <p className={itemsTitleClass}>Pain points</p>
                                    <p>Here are the core problems the designers were facing:
                                    </p>
                                    <br /><br />
                                    <List className="mt-16 lg:mt-0 lg:min-w-[33rem]">
                                        {painPoints.map((item, index) => {
                                            return (
                                                <ListItem key={index}>
                                                    <div className='flex space-x-8 w-full items-center'>
                                                        {/* <div className='w-[80px]'>
                                                                <GrayscaleTransitionImage
                                                                    src={item.img}
                                                                    quality={90}
                                                                    className='w-16 h-16' priority
                                                                />
                                                            </div> */}
                                                        <div className='w-full'>
                                                            <p>
                                                                {item.item}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </SectionIntro>
                            </Container>

                        </div>

                        {/* Analysis */}
                        <div className='mt-24'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={true} title='Analysis'>
                                    <p className={itemsTitleClass}>Problem statement</p>
                                    <p>Spectrum TV lacked a consistent design system across TV platforms. As a result, making changes to the product was challenging, with the design and engineering teams forced to maintain multiple sources of truth simultaneously.</p>
                                    <br />
                                    <br />
                                    <p className={itemsTitleClass}>Executive Summary</p>
                                    <p>The new design system will enforce consistent rules across all TV platforms, while maintaining separate component libraries for each to avoid creating overly complex components and bloated libraries. This approach will allow designers to iterate quickly and maintain consistency across different platforms.</p>
                                </SectionIntro>
                            </Container>
                        </div>

                        {/* Design */}
                        <div className='mt-24'>
                            {/* Text styles */}
                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title='Design'>
                                </SectionIntro>
                            </Container>
                            {design.map((item, index) => {
                                return (
                                    <div className='mb-24' key={index}>
                                        <Container>
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
                                        </Container>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Conclusion */}
                        <div className='mt-24'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={true} title='Conclusion'>
                                    <p>At the end of my contract with Spectrum TV, each team had access to a clean and organized component library tailored to their specific platform. I also provided training on how to effectively utilize the components and their variants.
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

export default CaseStudy


