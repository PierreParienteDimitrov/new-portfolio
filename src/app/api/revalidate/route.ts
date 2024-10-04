// src/app/api/revalidate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get('secret');

    // Validate the secret token to ensure the request is legitimate
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
        return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
    }

    try {
        await revalidatePath('/music');
        await revalidatePath('/photo');

        return NextResponse.json({ revalidated: true });
    } catch (err) {
        // Error handling
        if (err instanceof Error) {
            return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
