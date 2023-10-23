export interface IPage {
    title: string
    path: string
    isPublic: boolean
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
    ContainerDashboard = '/container-dashboard',
    CheckoutFlow = '/checkout-flow',
    LuxuryTravel = '/luxury-travel',
    UIShots = '/ui-shots',
    Work = '/work',
    Plugin = '/bluecargo-plugin',

}

export const pageInformation: Record<string, IPage> = {
    [Routes.About]: {
        title: 'Pierre Pariente Dimitrov - About',
        path: Routes.About,
        isPublic: true,
    },
    [Routes.Contact]: {
        title: 'Pierre Pariente Dimitrov - Contact',
        path: Routes.Contact,
        isPublic: true,
    },
    [Routes.Home]: {
        title: 'Pierre Pariente Dimitrov',
        path: Routes.Home,
        isPublic: true,
    },
    [Routes.RequestAccess]: {
        title: 'Pierre Pariente Dimitrov - Request Access',
        path: Routes.RequestAccess,
        isPublic: true,
    },
    [Routes.SignIn]: {
        title: 'Pierre Pariente Dimitrov - Sign In',
        path: Routes.SignIn,
        isPublic: true,
    },
    [Routes.ThankYou]: {
        title: 'Pierre Pariente Dimitrov - Thank you',
        path: Routes.ThankYou,
        isPublic: true,
    },
    [Routes.Tempso]: {
        title: 'Pierre Pariente Dimitrov - Tempso',
        path: Routes.Tempso,
        isPublic: true,
    },
    [Routes.TempsoUX]: {
        title: 'Pierre Pariente Dimitrov - Tempso UX',
        path: Routes.TempsoUX,
        isPublic: true,
    },
    [Routes.ContainerDashboard]: {
        title: 'Pierre Pariente Dimitrov - Container Tracking',
        path: Routes.ContainerDashboard,
        isPublic: false,
    },
    [Routes.LuxuryTravel]: {
        title: 'Pierre Pariente Dimitrov - Luxury Travel',
        path: Routes.LuxuryTravel,
        isPublic: false,
    },
    [Routes.UIShots]: {
        title: 'Pierre Pariente Dimitrov - Tempso UI Shots',
        path: Routes.UIShots,
        isPublic: true,
    },
    [Routes.Work]: {
        title: 'Pierre Pariente Dimitrov - Portfolio',
        path: Routes.Work,
        isPublic: true,
    },
    [Routes.CheckoutFlow]: {
        title: 'Pierre Pariente Dimitrov - Checkout Flow',
        path: Routes.CheckoutFlow,
        isPublic: false,
    },
    [Routes.Plugin]: {
        title: 'Pierre Pariente Dimitrov - BlueCargo Plugin ',
        path: Routes.Plugin,
        isPublic: false,
    },
}
