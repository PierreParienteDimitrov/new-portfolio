// app/music/page.tsx (Server Component)

import { client } from "@/sanity/lib/client";
import { MusicTrack } from "@/types/ISanity";
import MusicPlayer from './MusicPlayer'; // Client component
import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/Container";

// Server-side function to fetch music tracks with typing
const getMusicTracks = async (): Promise<MusicTrack[]> => {
    const query = `*[_type == "music"] | order(trackNumber asc) {
        name,
        description,
        "musicUrl": musicFile.asset->url,
        meta,
        trackNumber
    }`;

    const musicTracks = await client.fetch(query);

    return musicTracks;
}

// Server Component
export default async function MusicPage() {
    const tracks = await getMusicTracks(); // Fetch music data on the server

    return (
        <Container>
            <PageIntro title="Les Carnets de l'Eveil" eyebrow="Work in progress">
                <div className="flex flex-col space-y-4 mb-16">
                    <p>“Les Carnets de l&apos;Éveil” is a work in progress for violin, cello, and piano. The tracks are audio exports from the music notation software Sibelius.</p>
                    <p>Composer: Pierre Pariente Dimitrov</p>
                </div>
            </PageIntro>

            {/* Pass the fetched tracks to the client-side component */}
            <MusicPlayer tracks={tracks} />
        </Container>
    );
}

export const revalidate = 60; // Set a revalidation time (for ISR or fetch cache updates)

