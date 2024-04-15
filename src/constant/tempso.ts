
import FlowChartCompare from '@/images/work/tempso/flow-chart-compare.png'
import FlowChartDiscover from '@/images/work/tempso/flow-chart-discover.png'
import FlowChartExplore from '@/images/work/tempso/flow-chart-explore.png'
import Homepage from '@/images/work/tempso/homepage.png'
import Playlist from '@/images/work/tempso/playlists.png'
import Performer from '@/images/work/tempso/performers.png'
import Recording from '@/images/work/tempso/recording-components.png'
import Consistency from '@/images/work/tempso/consistency-components.png'
import Swimlanes from '@/images/work/tempso/swimlanes-components.png'



export const process = [{
    title: 'Research',
    items: ['Pain points', 'Perosnas'],
    gradient: 'from-indigo-50 to-sky-100'
}, {
    title: 'Ideation',
    items: ['User journey', 'Wireframes'],
    gradient: 'from-indigo-50 to-sky-100'
}, {
    title: 'Design',
    items: ['Low-fidelity wireframes', 'High-fidelity wireframes', 'Interactive prototypes'],
    gradient: 'from-indigo-50 to-sky-100'
},]

export const painPoints = [{
    title: '🎯 Accuracy',
    description: 'Classical music specialists who didn’t stream classical music said their reasoning was that they could never get a clear picture of what recording they were listening too. “Why is the composer tagged as a performer? Why can’t I find the complete list of performers for this recording?” were common comments addressed to mainstream music streaming platforms. I decided to change this by building a complete classical music data architecture which would guide the design process.',
}, {
    title: '♾️ Exhaustivity',
    description: 'Classical music specialists felt like they could never browse the complete discography of a performer, nor the complete list of compositions from a composer. They could also never compare easily different recordings of the same composition and select their preferred version',
}, {
    title: '🧭 Discovery',
    description: 'Non-specialists classical music listeners felt like it was extremely difficult to know where to start their journey on mainstream music streaming apps. They felt like they were left with limited choices with compilations such as “Relax with Mozart” or intimidating classical music albums where they did not understand the track titles. They wanted to discover and explore classical music but “did not know where to start”.',
},]

export const userJourney = [{
    title: 'User Journey #1: Compare Recordings',
    description: 'In order to answer Cecilia’s needs, I created a first flow chart that detailed all the required steps that a user must take to compare recordings of the same composition. This flow chart showed that users would have to undertake a lot of different steps in order to be able to compare recordings. User Research showed, however, that this feature was appreciated equally by all Personas. In addition, it seemed like a differentiator for Tempso. This is why I decided to have a Compare tab, in the bottom navigation. This tab is refreshed with the current composition that the user is listening to. This helps any user compare recordings easily and hammers Tempso’s value proposition; but also demonstrates the uniqueness of classical music.',
    img: FlowChartCompare,
}, {
    title: 'User Journey #2: Explore Recordings',
    description: 'In order to answer Nathalie’s needs, I created a user journey that allowed users like her to explore new recordings. This is why I created the concept of automated radios which are refreshed every day with new recordings. Those radios select recordings through a set of filters like a timeframe (daily discovery), a genre, a composer or performer.',
    img: FlowChartExplore,
}, {
    title: 'User Journey #3: Discover Recordings',
    description: 'In order to answer Benjamin’s needs, I created a user journey that allowed users like him to discover music. Those users needed more guidance than automated radios. This is why I created the concept of manually-curated playlists. Those thematic playlist showcase a selection of famous classical music recordings that are a good start for a new listener.',
    img: FlowChartDiscover,
},]

export const wireframes = [{
    title: 'Recording components',
    description: 'Create two Recording Component: one for all playlists, albums, radios; and another one specifically for the Compare page, which would focus the user on the performers only. Since the compare page would display as a title the composer name, era, and composition title, it felt unecessary to repeat this information for each recordings.',
    img: Recording
},
{
    title: 'Consistency',
    description: 'Build consitency with the same layout for all the Album, Playlist, Radio, Curated Playlist pages.',
    img: Consistency

},
{
    title: 'Swimlanes',
    description: 'Build swimlanes that would suggest to users playlists and radios in order to facilitate their discovery and exploration.',
    img: Swimlanes

},]

export const homepage = [{
    label: 'Tempso homepage',
    img: Homepage,
},]

export const playlist = [{
    label: 'Playlist pages',
    img: Playlist,
},]

export const performers = [{
    label: 'Performer pages',
    img: Performer,
},]