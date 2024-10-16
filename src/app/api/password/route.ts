import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const PASSWORD = process.env.PASSWORD;

export async function POST(request: Request) {
    const { password } = await request.json();

    if (password === PASSWORD) {
        const response = NextResponse.json({ success: true });

        // Set the password cookie
        response.cookies.set('password', password, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 365, // 10 years
        });

        return response;
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
