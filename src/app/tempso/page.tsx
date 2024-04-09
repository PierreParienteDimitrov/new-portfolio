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
import { EnterPassword } from '@/components/EnterPassword'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { TagList, TagListItem } from '@/components/TagList'
import DataArchitecture from '@/images/work/tempso/data-architecture.png'
import Tempso1 from '@/images/work/tempso/tempso-1.png'
import Tempso2 from '@/images/work/tempso/tempso-2.png'
import Tempso3 from '@/images/work/tempso/tempso-3.png'
import Tempso4 from '@/images/work/tempso/tempso-4.png'
import Cecilia from '@/images/work/tempso/Cecilia.png'
import Nathalie from '@/images/work/tempso/Nathalie.png'
import Benjamin from '@/images/work/tempso/Benjamin.png'
import FlowChartCompare from '@/images/work/tempso/flow-chart-compare.png'
import FlowChartDiscover from '@/images/work/tempso/flow-chart-discover.png'
import FlowChartExplore from '@/images/work/tempso/flow-chart-explore.png'
import Wireframes from '@/images/work/tempso/tempso_wireframes.png'








import { ICarousel } from '@/types/ICarousel'
import Carousel from '@/components/Carousel'
import { Button } from '@/components/Button'
import Link from 'next/link'


const TEMPSO: ICarousel[] = [
    {
        title: 'tempso1',
        src: Tempso1,
        alt: 'alt1',
    },
    {
        title: 'tempso2',
        src: Tempso2,
        alt: 'alt1',
    },
    {
        title: 'tempso3',
        src: Tempso3,
        alt: 'alt3',
    },
    {
        title: 'tempso4',
        src: Tempso4,
        alt: 'alt4',
    },
]


const Role = () => {
    return (

        <div className='flex flex-col items-center mt-24'>
            <h3 className='font-bold'>
                My Role
            </h3>
            <TagList className="mt-4">
                <TagListItem>User research</TagListItem>
                <TagListItem>Data architecture</TagListItem>
                <TagListItem>Wireframes</TagListItem>
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
                    <StatListItem value="+20%" label="Monthly active users from month to month" />
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
            <><Container>loading...</Container></>
        )
    }


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

            {showForm ? <EnterPassword /> :
                <article className="mt-24 sm:mt-32 lg:mt-40">
                    <header>
                        <PageIntro eyebrow="Case Study" title={caseStudy.title} centered>
                            <p>{caseStudy.description}</p>
                        </PageIntro>
                    </header>


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
                                <div className="border-y border-neutral-200">
                                    <div className="mx-auto max-w-[76rem">
                                        <Carousel carouselItems={TEMPSO} />
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
                                    Building a Spotify and Apple Music wrapper app for classical music.                                    </span>
                                <Role />
                                <Stats />
                            </Container>
                        </div>

                        <div className='mt-24'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title='Context'>
                                    <p>Tempso is a live Classical Music Streaming Mobile App, fully integrated with Spotify and Apple Music. My task was to design a mobile application where users could discover and browse the classical music catalogue,compare recordings and save liked recordings and playlists to their library.</p>
                                </SectionIntro>
                            </Container>
                        </div>
                        <div className='mt-24'>
                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title='Process'>
                                    <p className='mb-24'>As the sole UX/UI designer and researcher, my goal was to create a user-centered design for Tempso by spending extra time with researching and iterating designs based on usability testings. Thus, the process was divided into the following steps:</p>
                                </SectionIntro>
                            </Container>

                            <Container className='flex items-center'>
                                <SectionIntro title='Research'>
                                    <p className='mb-16'>I spent a full month conducting user research with musicians, classical music amateurs and music streaming users through interviews to understand user&apos;s experience with classical music streaming. I also reviewed secondary research and user comments about existing solutions for classical music streaming on forums and blogs.</p>
                                    <p className='mb-16'>My hypothesis was that a majority of users would listen to classical music only if they were already very familiar with the genre, but I was surprised to find in my research that over half of potential users did not have a strong relationship to classical music and were curious to discover it. The largest complaint found in research was that users, both classical music specialists and non-specialists, didn’t know how to find classical music recordings or where to start.</p>
                                </SectionIntro>
                            </Container>


                            <Container className='flex items-center'>
                                <SectionIntro smaller={false} title='Pain points'>
                                    <SectionIntro smaller={true} title='🎯 Accuracy'>
                                        <p className='mb-16'>Classical music specialists who didn’t stream classical music said their reasoning was that they could never get a clear picture of what recording they were listening too. “Why is the composer tagged as a performer? Why can’t I find the complete list of performers for this recording?” were common comments addressed to mainstream music streaming platforms. I decided to change this by building a complete classical music data architecture which would guide the design process.
                                        </p>
                                        <h5 className="pb-4 italic">
                                            Click on the image to open it in full-width
                                        </h5>
                                        <Container>
                                            <a
                                                href="_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdata-architecture.7ce7f9e2.png&w=2048&q=90
                                                "
                                                target="_blank"
                                                className="h-full w-full cursor-pointer"
                                            >
                                                <GrayscaleTransitionImage
                                                    src={DataArchitecture}
                                                    quality={90}
                                                    sizes="(min-width: 1216px) 76rem, 100vw"
                                                    priority
                                                    className="rounded-md mb-16"
                                                />
                                            </a>

                                        </Container>

                                    </SectionIntro>
                                    <SectionIntro smaller={true} title='♾️ Exhaustivity'>
                                        <p className='mb-16'>Classical music specialists felt like they could never browse the complete discography of a performer, nor the complete list of compositions from a composer. They could also never compare easily different recordings of the same composition and select their preferred version.</p>
                                    </SectionIntro>
                                    <SectionIntro smaller={true} title='🧭 Discovery'>
                                        <p className='mb-16'>Non-specialists classical music listeners felt like it was extremely difficult to know where to start their journey on mainstream music streaming apps. They felt like they were left with limited choices with compilations such as “Relax with Mozart” or intimidating classical music albums where they did not understand the track titles. They wanted to discover and explore classical music but “did not know where to start”.</p>
                                    </SectionIntro>
                                </SectionIntro>
                                <SectionIntro smaller={false} title='Define'>
                                    <p className='mb-16 mt-16'>I began the defining stage by creating multiple personas based on users interviewed during the research stage.</p>
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
                                    </div>

                                    <p className='mb-16 mt-16'>My biggest takeaway from research was that users wanted different type of experience for a classical music streaming app.Musicians and experimented classical music listeners wanted the ability to deep dive into the catalogue, explore performer’s discographies, composer’s catalogues, compare recordings, explore genres. This category of users wanted to be allowed to explore the catalogue through different data points, but did not need suggestions and recommendations on what to listen to First-time listeners wanted to know where to start and what to listen to. They are not independent listeners and need help to turn on the music. To answer bot of those needs, I decided to list desired actions for both personas and build user journey:</p>
                                </SectionIntro>
                                <SectionIntro smaller={false} title='User Journey'>
                                    <SectionIntro smaller={true} title='User Journey #1: Compare Recordings'>
                                        <p className='mb-16'>In order to answer Cecilia's needs, I created a first flow chart that detailed all the required steps that a user must take to compare recordings of the same composition.
                                            This flow chart showed that users would have to undertake a lot of different steps in order to be able to compare recordings. User Research showed, however, that this feature was appreciated equally by all Personas. In addition, it seemed like a differentiator for Tempso.
                                            This is why I decided to have a "Compare" tab, in the bottom navigation. This tab is refreshed with the current composition that the user is listening to. This helps any user compare recordings easily and "hammers" Tempso's value proposition; but also demonstrates the uniqueness of classical music.

                                        </p>
                                        <GrayscaleTransitionImage
                                            src={FlowChartCompare}
                                            quality={90}
                                            sizes="(min-width: 1216px) 76rem, 100vw"
                                            priority
                                            className="rounded-md"
                                        />

                                    </SectionIntro>
                                    <SectionIntro smaller={true} title='User Journey #2: Explore Recordings'>
                                        <p className='mb-16'>In order to answer Nathalie's needs, I created a user journey that allowed users like her to explore new recordings.
                                            This is why I created the concept of automated radios which are refreshed every day with new recordings. Those radios select recordings through a set of filters like a timeframe (daily discovery), a genre, a composer or performer.
                                        </p>
                                        <GrayscaleTransitionImage
                                            src={FlowChartExplore}
                                            quality={90}
                                            sizes="(min-width: 1216px) 76rem, 100vw"
                                            priority
                                            className="rounded-md"
                                        />

                                    </SectionIntro>
                                    <SectionIntro smaller={true} title='User Journey #3: Discover Recordings'>
                                        <p className='mb-16'>In order to answer Benjamin's needs, I created a user journey that allowed users like him to discover music.
                                            Those users needed more guidance than automated radios. This is why I created the concept of manually-curated playlists. Those thematic playlist showcase a selection of famous classical music recordings that are a good start for a new listener.
                                        </p>
                                        <GrayscaleTransitionImage
                                            src={FlowChartDiscover}
                                            quality={90}
                                            sizes="(min-width: 1216px) 76rem, 100vw"
                                            priority
                                            className="rounded-md"
                                        />

                                    </SectionIntro>
                                </SectionIntro>
                                <SectionIntro smaller={false} title='Wireframes'>
                                    <p className='mb-16'>The User Research, Data Architecture and User Journeys helped me start the Wireframes with the user in mind.
                                        I created low-fidelity mockups of the Browse page, the compare page, and a playlist / radio / album page. While doing this work, I layed out the main design concepts that guided the rest of the design work:
                                        Create two Recording Component: one for all playlists, albums, radios; and another one specifically for the Compare page, which would focus the user on the performers only. Since the compare page would display as a title the composer name, era, and composition title, it felt unecessary to repeat this information for each recordings.
                                        Build consitency with the same layout for all the Album, Playlist, Radio, Curated Playlist pages.
                                        Build carousel that would suggest to users playlists and radios in order to facilitate their discovery and exploration.
                                    </p>
                                    <GrayscaleTransitionImage
                                        src={Wireframes}
                                        quality={90}
                                        sizes="(min-width: 1216px) 76rem, 100vw"
                                        priority
                                        className="rounded-md"
                                    />
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
                </article >
            }

        </>
    )
}



export default Tempso



