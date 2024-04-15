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
import { PageLinks } from '@/components/PageLinks'
import { ICaseStudy } from '@/types/ICaseStudy'
import { EnterPassword } from '@/components/EnterPassword'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { TagList, TagListItem } from '@/components/TagList'
import DataArchitecture from '@/images/work/tempso/data-architecture.png'
import Cecilia from '@/images/work/tempso/Cecilia.png'
import Nathalie from '@/images/work/tempso/Nathalie.png'
import Benjamin from '@/images/work/tempso/Benjamin.png'
import Wireframes from '@/images/work/tempso/tempso_wireframes.png'
import { process, painPoints, userJourney, wireframes, homepage, playlist, performers } from '@/constant/tempso'
import Link from 'next/link'
import { List, ListItem } from '@/components/List'
import { Loading } from '@/components/Loading'






const itemsTitleClass = 'font-bold my-4'



const Role = () => {
    return (

        <div className='flex flex-col items-center mt-24'>
            <h3 className='font-bold'>
                My Role
            </h3>
            <TagList className="mt-4">
                <TagListItem>User research</TagListItem>
                <TagListItem>Data architecture</TagListItem>
                <TagListItem>UX & Wireframes</TagListItem>
                <TagListItem>UI design</TagListItem>
            </TagList>
        </div>
    )
}

const Stats = () => {
    return (
        <div>
            <div className='p-8 border border-gray-100 bg-gray-50 mt-24'>
                <StatList>
                    <StatListItem value="+20%" label="MAU growth" />
                    <StatListItem value="30%" label="Retention rate" />
                    <StatListItem value="+10k" label="Downloads" />
                </StatList>
            </div>
        </div>
    )
}


const Tempso = () => {

    const caseStudy: ICaseStudy = caseStudies.find((study) => study.key === 'tempso') as ICaseStudy;


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
                <title>{pageInformation[Routes.Tempso]!.title}</title>
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
                    </header>


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
                                    Building a Spotify and Apple Music wrapper app for classical music.</h2>
                                <Role />
                                <Stats />
                            </Container>
                        </div>

                        {/* Context */}
                        <div className='mt-48'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={true} title='Context'>
                                    <p>Tempso is a live Classical Music Streaming Mobile App, fully integrated with Spotify and Apple Music. My task was to design a mobile application where users could discover and browse the classical music catalogue,compare recordings and save liked recordings and playlists to their library.</p> <br />
                                </SectionIntro>
                            </Container>
                        </div>

                        {/* Process */}
                        <div className='mt-24'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={true} title='Process'>
                                    <p>As the sole UX/UI designer and researcher, my goal was to create a user-centered design for Tempso by spending extra time with researching and iterating designs based on usability testings. Thus, the process was divided into the following steps:</p>
                                    <br /><br />
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
                        <div className='mt-48'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={true} title='Research'>
                                    <p>I spent a full month conducting user research with musicians, classical music amateurs and music streaming users through interviews to understand user&apos;s experience with classical music streaming. I also reviewed secondary research and user comments about existing solutions for classical music streaming on forums and blogs.</p> <br /><br />
                                    <p>My hypothesis was that a majority of users would listen to classical music only if they were already very familiar with the genre, but I was surprised to find in my research that over half of potential users did not have a strong relationship to classical music and were curious to discover it. The largest complaint found in research was that users, both classical music specialists and non-specialists, didn’t know how to find classical music recordings or where to start.</p> <br /><br />
                                    <p className={itemsTitleClass}>Pain Points</p>
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
                                                            <h4>
                                                                {item.title}
                                                            </h4>
                                                            <p>{item.description}</p>
                                                        </div>
                                                    </div>
                                                </ListItem>
                                            );
                                        })}
                                        <br /><br />
                                        <p className={itemsTitleClass}>Personas</p>
                                        <p>I began the defining stage by creating multiple personas based on users interviewed during the research stage.</p>
                                        <div className='flex flex-col space-y-4'>
                                            <GrayscaleTransitionImage
                                                src={Cecilia}
                                                quality={90}
                                                sizes="(min-width: 1216px) 76rem, 100vw"
                                                priority
                                                className="rounded-md"
                                            />
                                            <GrayscaleTransitionImage
                                                src={Nathalie}
                                                quality={90}
                                                sizes="(min-width: 1216px) 76rem, 100vw"
                                                priority
                                                className="rounded-md"
                                            />
                                            <GrayscaleTransitionImage
                                                src={Benjamin}
                                                quality={90}
                                                sizes="(min-width: 1216px) 76rem, 100vw"
                                                priority
                                                className="rounded-md"
                                            />
                                            <br /><br />
                                            <p>My biggest takeaway from research was that users wanted different type of experience for a classical music streaming app.Musicians and experimented classical music listeners wanted the ability to deep dive into the catalogue, explore performer’s discographies, composer’s catalogues, compare recordings, explore genres. This category of users wanted to be allowed to explore the catalogue through different data points, but did not need suggestions and recommendations on what to listen to First-time listeners wanted to know where to start and what to listen to. They are not independent listeners and need help to turn on the music. To answer bot of those needs, I decided to list desired actions for both personas and build user journey</p>
                                        </div>
                                    </List>
                                </SectionIntro>
                            </Container>
                        </div>

                        {/* Ideation */}
                        <div className='mt-48'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={true} title='Ideation'>
                                    <p className={itemsTitleClass}>User Journey</p>
                                    <List className="mt-16 lg:mt-0 lg:min-w-[33rem]">
                                        {userJourney.map((item, index) => {
                                            return (
                                                <ListItem key={index}>
                                                    <div className='flex space-x-8 w-full items-center'>
                                                        <div className='w-full'>
                                                            <p className='font-semibold'>
                                                                {item.title}
                                                            </p>
                                                            <p>{item.description}</p>
                                                            <GrayscaleTransitionImage
                                                                src={item.img}
                                                                quality={90}
                                                                sizes="(min-width: 1216px) 76rem, 100vw"
                                                                priority
                                                                className="rounded-md"
                                                            />
                                                        </div>
                                                    </div>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                    <br /><br />
                                    <p className={itemsTitleClass}>Wireframes</p>
                                    <p>The User Research, Data Architecture and User Journeys helped me start the Wireframes with the user in mind.</p><br />
                                    <p>
                                        I created low-fidelity mockups of the Browse page, the compare page, and a playlist / radio / album page. While doing this work, I layed out the main design concepts that guided the rest of the design work: </p>
                                    <br /><br />

                                    <List className="mt-16 lg:mt-0 lg:min-w-[33rem]">
                                        {wireframes.map((item, index) => {
                                            return (
                                                <ListItem key={index}>
                                                    <div className='flex space-x-8 w-full items-center'>
                                                        <div className='w-full'>
                                                            <h4>
                                                                {item.title}
                                                            </h4>
                                                            <p>{item.description}</p>
                                                            <br /><br />
                                                            <GrayscaleTransitionImage
                                                                src={item.img}
                                                                quality={90}
                                                                sizes="(min-width: 1216px) 76rem, 100vw"
                                                                priority
                                                                className="rounded-md"
                                                            />
                                                        </div>
                                                    </div>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                    <br /><br />
                                    <GrayscaleTransitionImage
                                        src={Wireframes}
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
                            {/* Homepage */}
                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title='Design'>
                                    <p className={itemsTitleClass}>Homepage</p>
                                    <p>
                                        Tempso’s homepage acts as the gateway to the rest of the application, designed to guide users swiftly towards making music selections. It offers sections for guided discovery, like curated playlists and tours, to explore classical music, as well as automated radios and personalized recommendations based on user preferences. This structure helps users quickly choose how they want to engage with music.
                                    </p>
                                    <br /><br />
                                </SectionIntro>
                            </Container>
                            <Container>
                                <div className='flex justify-center flex-col px-4 md:px-16 py-4'>
                                    {homepage.map((item, index) => {
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

                            {/* Playlists */}
                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title=''>
                                    <p className={itemsTitleClass}>Playlists</p>
                                    <p>
                                        Users can choose from various types of playlists, such as a daily discovery designed to broaden their knowledge of the classical music repertoire, or selections based on specific performers or composers.
                                    </p>
                                    <br /><br />
                                </SectionIntro>
                            </Container>
                            <Container>
                                <div className='flex justify-center flex-col px-4 md:px-16 py-4'>
                                    {playlist.map((item, index) => {
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

                            {/* Performers */}
                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title=''>
                                    <p className={itemsTitleClass}>Performers</p>
                                    <p>
                                        The artist pages, dedicated to both composers and performers, allow users to delve deeply into their discographies. Users can explore these pages by recordings, albums, labels, compositions, genres, and more, providing a comprehensive view of each artist’s contributions.
                                    </p>
                                    <br /><br />
                                </SectionIntro>
                            </Container>
                            <Container>
                                <div className='flex justify-center flex-col px-4 md:px-16 py-4'>
                                    {performers.map((item, index) => {
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
                        </div>

                        {/* Conclusion */}
                        <div className='mt-24'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={true} title='Conclusion'>
                                    <p>Tempso is a live application used daily by classical music enthusiasts and first-time listeners alike. It is the only service that integrates with both Spotify and Apple Music, and it is entirely free to use.
                                    </p>
                                    <br />
                                    <h2 className='mt-32'>Thank you for reading!</h2>
                                </SectionIntro>
                                <SectionIntro smaller={false} title='Download Tempso' className='pt-16'>
                                    <div className='mt-4'>
                                        <Link href="https://www.tempso.com/" target='blank' className='text-center underline'>
                                            Tempso is a live application! Download it here!
                                        </Link>
                                    </div>
                                </SectionIntro>
                            </Container>
                        </div>
                    </FadeIn>
                    <ContactSection />
                </article >
            }
        </>
    )
}



export default Tempso



