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
    Spectrum = '/spectrum-design-system',
    ContainerManagement = '/container-management-lifecycle',
    OutlookPlugin = '/outlook-plugin',
    CheckoutFlow = '/checkout-flow',
    LuxuryTravel = '/luxury-travel',
    UIShots = '/ui-shots',
    Work = '/work',
    ProductMarketing = '/product-marketing'

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
    [Routes.ContainerManagement]: {
        title: 'Pierre Pariente Dimitrov - Container Management Lifecycle',
        path: Routes.ContainerManagement,
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
    [Routes.OutlookPlugin]: {
        title: 'Pierre Pariente Dimitrov - BlueCargo Shipments ',
        path: Routes.OutlookPlugin,
        isPublic: false,
    },
    [Routes.Spectrum]: {
        title: 'Pierre Pariente Dimitrov - Spectrum TV Design System ',
        path: Routes.Spectrum,
        isPublic: false,
    },
    [Routes.ProductMarketing]: {
        title: 'Pierre Pariente Dimitrov - BlueCargo Product Marketing Assets',
        path: Routes.ProductMarketing,
        isPublic: true,
    },
}
