export interface IPage {
    title: string
    path: string
    isPublic: boolean
    showFooter?: boolean
}

export enum Routes {
    About = '/about',
    Contact = '/contact',
    Home = '/',
    RequestAccess = '/request-access',
    SignIn = '/signin',
    ThankYou = '/thank-you',
    Tempso = '/tempso',
    TempsoUX = '/tempso-ux',
    Spectrum = '/spectrum-design-system',
    ContainerManagement = '/container-management-lifecycle',
    OutlookPlugin = '/outlook-plugin',
    CheckoutFlow = '/checkout-flow',
    LuxuryTravel = '/luxury-travel',
    UIShots = '/ui-shots',
    Work = '/work',
    ProductMarketing = '/product-marketing',
    Photography = '/photography',
    Music = '/music'

}

export const pageInformation: Record<string, IPage> = {
    [Routes.About]: {
        title: 'Pierre Pariente Dimitrov - About',
        path: Routes.About,
        isPublic: true,
        showFooter: true,
    },
    [Routes.Contact]: {
        title: 'Pierre Pariente Dimitrov - Contact',
        path: Routes.Contact,
        isPublic: true,
        showFooter: true,
    },
    [Routes.Home]: {
        title: 'Pierre Pariente Dimitrov',
        path: Routes.Home,
        isPublic: true,
        showFooter: true,
    },
    [Routes.RequestAccess]: {
        title: 'Pierre Pariente Dimitrov - Request Access',
        path: Routes.RequestAccess,
        isPublic: true,
        showFooter: true,
    },
    [Routes.SignIn]: {
        title: 'Pierre Pariente Dimitrov - Sign In',
        path: Routes.SignIn,
        isPublic: true,
        showFooter: false,

    },
    [Routes.ThankYou]: {
        title: 'Pierre Pariente Dimitrov - Thank you',
        path: Routes.ThankYou,
        isPublic: true,
        showFooter: true,
    },
    [Routes.Tempso]: {
        title: 'Pierre Pariente Dimitrov - Tempso',
        path: Routes.Tempso,
        isPublic: true,
        showFooter: true,
    },
    [Routes.TempsoUX]: {
        title: 'Pierre Pariente Dimitrov - Tempso UX',
        path: Routes.TempsoUX,
        isPublic: true,
        showFooter: true,
    },
    [Routes.ContainerManagement]: {
        title: 'Pierre Pariente Dimitrov - Container Management Lifecycle',
        path: Routes.ContainerManagement,
        isPublic: false,
        showFooter: true,
    },
    [Routes.LuxuryTravel]: {
        title: 'Pierre Pariente Dimitrov - Luxury Travel',
        path: Routes.LuxuryTravel,
        isPublic: false,
        showFooter: true,
    },
    [Routes.UIShots]: {
        title: 'Pierre Pariente Dimitrov - Tempso UI Shots',
        path: Routes.UIShots,
        isPublic: true,
        showFooter: true,
    },
    [Routes.Work]: {
        title: 'Pierre Pariente Dimitrov - Portfolio',
        path: Routes.Work,
        isPublic: true,
        showFooter: true,
    },
    [Routes.CheckoutFlow]: {
        title: 'Pierre Pariente Dimitrov - Checkout Flow',
        path: Routes.CheckoutFlow,
        isPublic: false,
        showFooter: true,
    },
    [Routes.OutlookPlugin]: {
        title: 'Pierre Pariente Dimitrov - BlueCargo Shipments ',
        path: Routes.OutlookPlugin,
        isPublic: false,
        showFooter: true,
    },
    [Routes.Spectrum]: {
        title: 'Pierre Pariente Dimitrov - Spectrum TV Design System ',
        path: Routes.Spectrum,
        isPublic: false,
        showFooter: true,
    },
    [Routes.ProductMarketing]: {
        title: 'Pierre Pariente Dimitrov - BlueCargo Product Marketing Assets',
        path: Routes.ProductMarketing,
        isPublic: true,
        showFooter: true,
    },
    [Routes.Photography]: {
        title: 'Pierre Pariente Dimitrov - Photos',
        path: Routes.Photography,
        isPublic: true,
        showFooter: false,
    },
    [Routes.Music]: {
        title: 'Pierre Pariente Dimitrov - Photos',
        path: Routes.Music,
        isPublic: true,
        showFooter: false,
    },
}
