import Upload from '@/images/work/shipments/uploading.png'
import Tags from '@/images/work/shipments/Tags.png'
import Filter from '@/images/work/shipments/filters.png'
import FilterComponent from '@/images/work/shipments/filters-component.png'
import Workflow from '@/images/work/shipments/workflow.png'
import WorkflowActions from '@/images/work/shipments/workflow-action.png'
import Dashboard from '@/images/work/shipments/dashboard.png'
import Icon1 from '@/images/work/shipments/icon-01.svg'
import Icon2 from '@/images/work/shipments/icon-02.svg'
import Icon3 from '@/images/work/shipments/icon-03.svg'
import Icon4 from '@/images/work/shipments/icon-04.svg'
import Icon5 from '@/images/work/shipments/icon-05.svg'
import Icon6 from '@/images/work/shipments/icon-06.svg'
import Icon7 from '@/images/work/shipments/icon-07.svg'
import Icon8 from '@/images/work/shipments/icon-08.svg'



export const process = [{
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

export const useCases = [{
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

export const designPrinciples = [{
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

export const featureNarrative = [{
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

export const flow = [{
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

export const dataIngestion = [{
    label: 'Container upload',
    img: Upload,
}, {
    label: 'Container tagging component states',
    img: Tags,
}]

export const dataVisualization = [{
    label: 'Filter panel open',
    img: Filter,
}, {
    label: 'Filter selection component states',
    img: FilterComponent,
}]

export const workflow = [{
    label: 'Workflow selection',
    img: Workflow,
}, {
    label: 'Workflow & actions configuration',
    img: WorkflowActions,
}]

export const dashboard = [{
    label: 'Home dashboard',
    img: Dashboard,
},]
