import { type Metadata } from 'next'
import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import imageAngelaFisher from '@/images/team/angela-fisher.jpg'
import imageBenjaminRussel from '@/images/team/benjamin-russel.jpg'
import imageBlakeReid from '@/images/team/blake-reid.jpg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpg'
import imageDriesVincent from '@/images/team/dries-vincent.jpg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpg'
import imageJeffreyWebb from '@/images/team/jeffrey-webb.jpg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpg'
import imageLeonardKrasner from '@/images/team/leonard-krasner.jpg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpg'
import imageMichaelFoster from '@/images/team/michael-foster.jpg'
import imageWhitneyFrancis from '@/images/team/whitney-francis.jpg'
import { loadArticles } from '@/lib/mdx'
import { skills, employment, education, interests } from '@/constant/resume'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { List, ListItem } from '@/components/List'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoTempso from '@/images/clients/tempso/tempso-logo-light.svg'
import logoBluecargo from '@/images/clients/bluecargo/bluecargo-logo-light.svg'
import logoSiemens from '@/images/clients/siemens/siemens-logo-light.svg'
import logoDelair from '@/images/clients/delair-labs/delair-logo-light.svg'
import logoBnp from '@/images/clients/bnp/bnp-logo-light.svg'
import logoSpectrum from '@/images/clients/spectrum/spectrum-logo-light.svg'
import imageFlow from '@/images/flows.jpg'



const clients = [
  ['BlueCargo', logoBluecargo],
  ['Spectrum', logoSpectrum],
  ['Tempso', logoTempso],
  ['Delair', logoDelair],
  ['BNP Paribas', logoBnp],
  ['Siemens', logoSiemens],
]


function Clients() {
  return (
    <div className="py-8">
      <FadeIn className="flex items-center gap-x-8">
        <p className="text-center font-display font-regular text-neutral-950">
          For the last 10 years I have been helping startups and big corporations deliver better experience across iOS, Android, Web and TV.
        </p>
      </FadeIn >

      <FadeInStagger faster>
        <ul
          role="list"
          className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-3"
        >
          {clients.map(([client, logo]) => (
            <li key={client} className='w-full h-24 flex justify-center items-center border border-gray-200 rounded-sm hover:bg-neutral-50 hover:cursor-pointer'>
              <FadeIn>
                <Image src={logo} alt={client} unoptimized />
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </div >
  )
}


function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="My process"
        title="I am a full stack product designer & engineer with extensive experience in user experience and interface."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <h4>
          My skills covers user research, user flows, wireframes, high-fidelity mockups, design systems and developer documentation.
        </h4>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageFlow}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="User research">
              As a product designer, I prioritize understanding users by conducting qualitative interviews, immersive on-sites, and analyzing available data to uncover their needs, frustrations, and digital fluency.</ListItem>
            <ListItem title="User flows and wireframes">
              Through user flows & wireframes I test assumptions against real life and iterate closely with a few selected users to improve the experience and make sure to cover at least the essentials needs.
            </ListItem>
            {/* <ListItem title="Product roadmap">
              I refine user experiences by testing assumptions with user flows and wireframes, iterating closely with select users to ensure essential needs are met.
            </ListItem> */}
            <ListItem title="High-fidelity mockups and prototypes">
              When the user experience is solidified, I build high-fidelity mockups & prototypes of the product for a last round of internal and external validation.
            </ListItem>
            <ListItem title="Design systems and documentation">
              After finalizing the high-fidelity designs, I develop comprehensive documentation to accelerate the engineering process and continuously build, maintain, and enhance the design system and component library.
            </ListItem>
            <ListItem title="Development">
              My engineering skills in HTML, CSS, JavaScript/TypeScript, and libraries like React, along with frameworks such as Next.js, Express.js, and Tailwind.css, enable me to build live prototypes and MVPs to test product assumptions with end users.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}


const Skills = () => {
  return (
    <div>
      <PageIntro title="Skills">
      </PageIntro>
      <Container>
        <List className='mt-16'>
          {skills.map((el, index) => {
            return (
              <ListItem title={el.category} key={index}>
                <div className='flex space-x-8 w-full items-center'>
                  <div className='w-[80px]'>
                    <GrayscaleTransitionImage
                      src={el.img}
                      quality={90}
                      className='w-16 h-16' priority
                    />
                  </div>
                  <div className='w-full'>
                    <p>{el.description}</p>
                  </div>
                </div>
              </ListItem>
            )
          })}
        </List>
      </Container>

    </div>
  )
}


const Employment = () => {
  return (
    <div>
      <PageIntro title="Employment">
      </PageIntro>
      <Container>
        <List className='mt-16'>
          {employment.map((el, index) => {
            return (
              <ListItem key={index}>
                <h5 className='uppercase leading-3 font-semibold text-blue-800 pb-4'>{el.header}</h5>
                <h3 className='font-bold pb-4'>{el.title}</h3>
                {el.description.map((el, index) => {
                  return (
                    <div key={index} className='py-4'>
                      <p className='font-semibold'>{el.title}</p>
                      <p className='font-light'>{el.job}</p>
                    </div>
                  )
                })}
              </ListItem>
            )
          })}
        </List>
      </Container>

    </div >
  )
}


const Education = () => {
  return (
    <div>
      <PageIntro title="Education">
      </PageIntro>
      <Container>
        <List className='mt-16'>
          {education.map((el, index) => {
            return (
              <ListItem key={index}>
                <h5 className='uppercase leading-3 font-semibold text-blue-800 pb-4'>{el.header}</h5>
                <h3 className='font-bold pb-4'>{el.title}</h3>
                <p className='font-light'>{el.description}</p>
              </ListItem>
            )
          })}
        </List>
      </Container>

    </div >
  )
}

const Interests = () => {
  return (
    <div>
      <PageIntro title="Interests">
      </PageIntro>
      <Container>
        <List className='mt-16'>
          {interests.map((el, index) => {
            return (
              <ListItem key={index}>
                <h5 className='uppercase leading-3 font-semibold text-blue-800 pb-4'>{el.header}</h5>
                <p className='font-light'>{el.description}</p>
              </ListItem>
            )
          })}
        </List>
      </Container>

    </div >
  )
}

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Our culture"
        title="Balance your passion with your passion for life."
        invert
      >
        <p>
          We are a group of like-minded people who share the same core values.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Loyalty" invert>
            Our team has been with us since the beginning because none of them
            are allowed to have LinkedIn profiles.
          </GridListItem>
          <GridListItem title="Trust" invert>
            We don’t care when our team works just as long as they are working
            every waking second.
          </GridListItem>
          <GridListItem title="Compassion" invert>
            You never know what someone is going through at home and we make
            sure to never find out.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

const team = [
  {
    title: 'Leadership',
    people: [
      {
        name: 'Leslie Alexander',
        role: 'Co-Founder / CEO',
        image: { src: imageLeslieAlexander },
      },
      {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        image: { src: imageMichaelFoster },
      },
      {
        name: 'Dries Vincent',
        role: 'Partner & Business Relations',
        image: { src: imageDriesVincent },
      },
    ],
  },
  {
    title: 'Team',
    people: [
      {
        name: 'Chelsea Hagon',
        role: 'Senior Developer',
        image: { src: imageChelseaHagon },
      },
      {
        name: 'Emma Dorsey',
        role: 'Senior Designer',
        image: { src: imageEmmaDorsey },
      },
      {
        name: 'Leonard Krasner',
        role: 'VP, User Experience',
        image: { src: imageLeonardKrasner },
      },
      {
        name: 'Blake Reid',
        role: 'Junior Copywriter',
        image: { src: imageBlakeReid },
      },
      {
        name: 'Kathryn Murphy',
        role: 'VP, Human Resources',
        image: { src: imageKathrynMurphy },
      },
      {
        name: 'Whitney Francis',
        role: 'Content Specialist',
        image: { src: imageWhitneyFrancis },
      },
      {
        name: 'Jeffrey Webb',
        role: 'Account Coordinator',
        image: { src: imageJeffreyWebb },
      },
      {
        name: 'Benjamin Russel',
        role: 'Senior Developer',
        image: { src: imageBenjaminRussel },
      },
      {
        name: 'Angela Fisher',
        role: 'Front-end Developer',
        image: { src: imageAngelaFisher },
      },
    ],
  },
]

function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Resume',
}

export default async function About() {
  let blogArticles = (await loadArticles()).slice(0, 2)

  return (
    <>
      <PageIntro eyebrow="About me" title="I am a seasoned Product Designer with a strong background in front-end engineering. ">
        <p>
          As the third employee and Senior Product Designer at BlueCargo (YC S18, Series A), I spearheaded the design and launch of critical products for supply chain professionals, significantly boosting company revenue and facilitating growth from 3 to 40 team members.
        </p>
        <br />
        <p>Previously at Spectrum TV, I developed and managed a sophisticated cross-platform design system, enhancing collaboration and consistency across all video platform teams.</p>
      </PageIntro>
      {/* <Container className="mt-16">
        <StatList>
          <StatListItem value="35" label="Underpaid employees" />
          <StatListItem value="52" label="Placated clients" />
          <StatListItem value="$25M" label="Invoices billed" />
        </StatList>
      </Container> */}

      <div className='mx-auto max-w-7xl px-6 lg:px-8 mt-16 sm:mt-16'>
        <Clients />
      </div>


      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Tempso User Feedback', logo: logoTempso }}
      >
        <h2>
          Tempso is a very useful app with an excellent UI. A must have if you have Spotify and you like classical music. Thanks for making this.
        </h2>
        <br />

        <h4>December 25, 2023 | Google Play</h4>
      </Testimonial>

      <Services />

      <ContactSection />

      <Skills />

      <Employment />

      <Education />

      <Interests />


      {/* <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
        pages={blogArticles}
      /> */}

      <ContactSection />
    </>
  )
}
