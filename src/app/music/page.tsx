// app/music/page.tsx (Server Component)

import { client } from "@/sanity/lib/client";
import { MusicTrack } from "@/types/ISanity";
import { GroupedAlbum } from "@/types/ISanity";

import MusicPlayer from './MusicPlayer'; // Client component
import { PageIntro } from "@/components/PageIntro";
import { Container } from "@/components/Container";

// Server-side function to fetch music tracks with typing



const getMusicTracks = async (): Promise<GroupedAlbum[]> => {
    // Sanity query to fetch music tracks and album details
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

    // Fetch the data from Sanity
    const responseFromSanity: MusicTrack[] = await client.fetch(query);

    // Reduce the tracks into grouped albums
    const albums = responseFromSanity.reduce<GroupedAlbum[]>((acc, track: MusicTrack) => {
        // Safely check if the album exists and has a name
        if (!track.album || !track.album.name) {
            return acc;  // Skip tracks without a valid album or album name
        }

        // Find if the album already exists in the accumulator
        const existingAlbum = acc.find(
            (albumEntry: { album: { name: string; }; }) => albumEntry.album.name === track.album!.name
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
                tracks: [trackData],  // Add the current track to a new track array
            });
        }

        return acc;
    }, []); // Initialize the accumulator as an empty array

    // Return the grouped albums
    return albums;
};


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







