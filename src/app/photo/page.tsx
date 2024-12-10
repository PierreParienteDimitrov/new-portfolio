// app/photos/page.tsx (Server Component)

import { client } from "@/sanity/lib/client";
import { PhotoAlbum } from "@/types/ISanity";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import AlbumIndex from "./AlbumIndex";

// Set the revalidation time (ISR)
export const revalidate = 60;

// Server-side function to fetch photo album data with pagination
const getPhotoAlbums = async (): Promise<PhotoAlbum[]> => {
  const query = `*[_type == "photoAlbum"] {
    title,
    description,
    releaseDate,
    cover {
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
    link {
      url,
      text
    }
  }`;

  // Fetch data directly
  const albums = await client.fetch(query);

  // Return the data as is (no need for .json())
  return albums;
};



// Server Component
export default async function PhotosPage() {
  const albums = await getPhotoAlbums(); // Fetch the first set of photos on the server

  return (
    <Container>
      <PageIntro title="Photo Albums" centered />
      <AlbumIndex albums={albums} /> {/* Pass initialPhotos */}
    </Container>
  );
}
