import { pageInformation, Routes } from './allPages'
import tempsoUX from '@/images/ux-case-study-tempso.png'
import containerManagement from '@/images/case-study-container-management.png'
import OutlookPlugin from '@/images/work/bluecargo-plugin/screen-5.png'
import Portfolio from '@/images/software-portfolio.png'
import checkoutFlow from '@/images/case-study-payment-plan.png'
import designSystemSpectrum from '@/images/case-study-spectrum.png'
import kbwf from '@/images/case-study-KBWF.png'
import uiChallenge from '@/images/case-study-UI-challenge.png'
import tempsoLanding from '@/images/case-study-tempso-landing-page.png'
import ProductMarketing from '@/images/case-study-product-marketing.png'





export const caseStudies = [
    {
        key: 'shipments',
        client: 'BlueCargo',
        year: '2024',
        platform: 'desktop',
        title: 'BlueCargo - Container Management Lifecycle',
        description:
            'Designed a container management lifecycle solution for Supply Chain professionals.',
        href: pageInformation[Routes.ContainerManagement]!.path,
        src: containerManagement,
        alt: 'Container Tracking Case Study',
        external: false,
        projectType: 'design',
        metrics: [
            '2020',
            'user research, user experience, user interface',
            'user interviews, wireframing, usability studies',
            'native IOS & android',
            'miro mindmapping, octopus sitemap, figma',
        ],
        latest: true,
    },
    {
        key: 'spectrum',
        client: 'Spectrum TV (Charter Communications)',
        year: '2022-2023',
        platform: 'TV, mobile, desktop',
        title: 'Spectrum TV - Design Systems For TV Platforms',
        description:
            'Rebuilt the design system supporting all video platforms, invluding TV and Mobile.',
        href: pageInformation[Routes.Spectrum]!.path,
        src: designSystemSpectrum,
        alt: 'Spectrum TV Case Study',
        external: false,
        projectType: 'design',
        metrics: [
            '2022-2023',
            'user interface',
            'component library',
            'design system',
        ],
        latest: true,
    },
    {
        key: 'portfolio_website',
        client: 'Portfolio Website',
        year: '2024',
        platform: 'responsive web',
        title: 'Design And Development Of Portfolio Website',
        description:
            'Designed and built the front-end and back-end of my portfolio website using Next.js, React.js, Node.js, Tailwind CSS, Vercel.',
        href: 'https://github.com/PierreParienteDimitrov/new-portfolio',
        src: Portfolio,
        alt: 'Portfolio Website',
        external: true,
        projectType: 'design',
        metrics: [
            '2024',
        ],
        latest: true,
    },
    {
        key: 'tempso',
        client: 'Tempso',
        year: '2022',
        platform: 'native (IOS & ANDROID)',
        title: 'Tempso - Classical Music Wrapper App For Spotify and Apple Music',
        description:
            'Designed a classical music streaming application fully integrated with Apple Music and Spotify.',
        href: pageInformation[Routes.Tempso]!.path,
        src: tempsoUX,
        alt: 'Tempso UX Case Study',
        external: false,
        projectType: 'design',
        metrics: [
            '2020',
            'user research, user experience, user interface',
            'user interviews, wireframing, usability studies',
            'native IOS & android',
            'miro mindmapping, octopus sitemap, figma',
        ],
        latest: true,
    },
    {
        key: 'marketing',
        client: 'BlueCargo',
        year: '2024',
        platform: 'Web & Print',
        title: 'BlueCargo - Product Marketing assets',
        description:
            'Created product marketing assets for the sales & CS teams',
        href: pageInformation[Routes.ProductMarketing]!.path,
        src: ProductMarketing,
        alt: 'Product Marketing',
        external: false,
        projectType: 'product design',
        metrics: [
            '2024',
            'Flyers',
            'Sales decks',
            'Ads',
            'Tradeshow assets',
        ],
        latest: true,
    },

    {
        key: 'bluecargo_payment',
        client: 'BlueCargo',
        year: '2022',
        platform: 'desktop',
        title: 'Designing a checkout flow',
        description:
            'Designed a checkout flow for a Supply Chain software, where users have a choice between three plans, and can adjust their volume per plan.',
        href: pageInformation[Routes.CheckoutFlow]!.path,
        src: checkoutFlow,
        alt: 'Checkout Flow Case Study',
        external: false,
        projectType: 'design',
        metrics: [
            '2021',
            'user experience, user interface',
            'wireframing',
            'desktop',
            'flow charts, figma',
        ],
        latest: true,
    },
    {
        key: 'bluecargo_plugin',
        client: 'BlueCargo',
        year: '2023',
        platform: 'Outlook plugin',
        title: 'Designing a plugin to process and dispute per diem invoices in Outlook',
        description:
            'I created an Outlook plugin that brings key BlueCargo features directly to users\' email software, reducing the need to switch between platforms.',
        href: pageInformation[Routes.OutlookPlugin]!.path,
        src: OutlookPlugin,
        alt: 'Per diem dispute Outlook plugin case study',
        external: false,
        projectType: 'design',
        metrics: [
            '2020',
            'user research, user experience, user interface',
            'user interviews, wireframing, usability studies',
            'native IOS & android',
            'miro mindmapping, octopus sitemap, figma',
        ],
        latest: true,
    },



    {
        key: 'kbwf',
        client: 'Know Better World Foundation',
        year: '2020',
        platform: 'desktop',
        title: 'Designing and building a website for a Foundation',
        description:
            'Designed and build a website for a foundation emporing women to become entrepeneur.',
        href: 'https://www.knowbetterworldfoundation.org/',
        src: kbwf,
        alt: 'Know Better World Foundation Website',
        external: true,
        projectType: 'design',
        metrics: [
            '2020',
            'user research, user experience, user interface',
            'user interviews, wireframing, usability studies',
            'native IOS & android',
            'miro mindmapping, octopus sitemap, figma',
        ],
        latest: false,
    },
    {
        key: 'ui_shots',
        client: 'UI Shots',
        year: '2020',
        platform: 'desktop and mobile',
        title: '100 days of UI Challenge',
        description: 'Designed UI shots to explore different design universe.',
        href: pageInformation[Routes.UIShots]!.path,
        src: uiChallenge,
        alt: 'UI Shots',
        external: false,
        projectType: 'design',
        metrics: [
            '2020',
            'user research, user experience, user interface',
            'user interviews, wireframing, usability studies',
            'native IOS & android',
            'miro mindmapping, octopus sitemap, figma',
        ],
        latest: false,
    },

    {
        key: 'tempso_website',
        client: 'Tempso Landing Page',
        year: '2021',
        platform: 'responsive web',
        title: 'Designed and built Tempso landing page.',
        description:
            'Designed and built Tempso landing page using Webflow.',
        href: 'https://www.tempso.com/',
        src: tempsoLanding,
        alt: 'Tempso Landing Page',
        external: true,
        projectType: 'software',
        metrics: [
            '2020',
            'user research, user experience, user interface',
            'user interviews, wireframing, usability studies',
            'native IOS & android',
            'miro mindmapping, octopus sitemap, figma',
        ],
        latest: false,
    },
]
