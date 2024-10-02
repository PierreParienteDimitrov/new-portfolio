// app/music/page.tsx (Server Component)

import { client } from "@/sanity/lib/client";
import { Album } from "@/types/ISanity";
import MusicPlayer from './MusicPlayer'; // Client component
import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/Container";

// Server-side function to fetch music tracks with typing
const getMusicTracks = async (): Promise<Album[]> => {
    const query = `*[_type == "music"] | order(trackNumber asc) {
        name,
        description,
        "musicUrl": musicFile.asset->url,
        meta,
        trackNumber,
        album->{
          name,
          description,
          composer,
          releaseDate
        }
      }`;

    const responseFromSanity = await client.fetch(query);

    const albums = responseFromSanity.reduce((acc: { album: { name: any; description: any; composer: any; releaseDate: any; }; tracks: { name: any; description: any; musicUrl: any; meta: any; trackNumber: any; }[]; }[], track: { album: { name: any; description: any; composer: any; releaseDate: any; }; name: any; description: any; musicUrl: any; meta: any; trackNumber: any; }) => {
        // Find if the album already exists in the accumulator
        const existingAlbum = acc.find(
            (albumEntry: { album: { name: any; }; }) => albumEntry.album.name === track.album.name
        );

        const trackData = {
            name: track.name,
            description: track.description,
            musicUrl: track.musicUrl,
            meta: track.meta,
            trackNumber: track.trackNumber,
        };

        if (existingAlbum) {
            // If the album already exists, push the track to its track array
            existingAlbum.tracks.push(trackData);
        } else {
            // If the album doesn't exist, create a new entry for the album
            acc.push({
                album: {
                    name: track.album.name,
                    description: track.album.description,
                    composer: track.album.composer,
                    releaseDate: track.album.releaseDate,
                },
                tracks: [trackData], // Add the current track to a new track array
            });
        }

        return acc;
    }, []);

    return albums;
}

// Server Component
export default async function MusicPage() {
    const albums = await getMusicTracks(); // Fetch music data on the server

    return (
        <Container>
            <PageIntro title="Compositions" eyebrow="Work in progress">
            </PageIntro>

            {/* Pass the fetched tracks to the client-side component */}
            <MusicPlayer albums={albums} />
        </Container>
    );
}

export const revalidate = 60; // Set a revalidation time (for ISR or fetch cache updates)







