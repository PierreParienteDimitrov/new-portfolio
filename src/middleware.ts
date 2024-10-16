import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {

    // Get the cookie from the request
    const passwordCookie = req.cookies.get('password');
    const currentUrl = req.nextUrl.pathname; // Get the current page's URL


    // If the cookie doesn't exist or the value is wrong, redirect to login
    if (!passwordCookie || passwordCookie.value !== process.env.PASSWORD) {
        // Add the original URL to the query params so we can redirect back after login
        const redirectUrl = new URL(`/login?redirect=${currentUrl}`, req.nextUrl.origin);

        return NextResponse.redirect(redirectUrl);
    }

    // Allow access if the password matches
    return NextResponse.next();
}

// Apply middleware only for specific pages
export const config = {
    matcher: ['/music/:path*', '/container-management-lifecycle/:path*', '/bluecargo-plugin/:path*', '/spectrum-design-system/:path*', '/checkout-flow/:path*', '/outlook-plugin/:path*']
};