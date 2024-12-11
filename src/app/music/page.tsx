// app/music/page.tsx (Server Component)

import { client } from "@/sanity/lib/client";
import { GroupedAlbum } from "@/types/ISanity";

import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/Container";
import Albums from "./Albums";

// Server-side function to fetch music tracks with typing

export const revalidate = 60; // Optional revalidation time (ISR)


const getAlbums = async (): Promise<GroupedAlbum[]> => {
    const query = `*[_type == "album"] | order(releaseDate desc) {
        name,
        description,
        "coverUrl": cover.asset->url,
        composer,
        releaseDate,
        externalLink
    }`;

    // Fetch the album data from Sanity
    const albums = await client.fetch(query);

    return albums;
};


// Server Component
export default async function MusicPage() {
    const albums = await getAlbums(); // Fetch music data on the server

    return (
        <Container>
            <PageIntro title="Compositions" eyebrow="Work in progress">
            </PageIntro>

            {/* Pass the fetched tracks to the client-side component */}
            <Albums albums={albums} />
        </Container>
    );
}







