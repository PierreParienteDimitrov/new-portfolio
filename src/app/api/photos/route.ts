import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 12;
    const start = (page - 1) * limit;

    const query = `*[_type == "photo"] | order(uploadTime desc) [${start}...${start + limit}] {
        name,
        location,
        description,
        photo {
          asset -> {
            _id,
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          }
        },
        meta,
        uploadTime
    }`;

    const photos = await client.fetch(query);

    return NextResponse.json(photos);
}
