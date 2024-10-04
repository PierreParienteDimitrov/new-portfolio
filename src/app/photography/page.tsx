// app/photos/page.tsx (Server Component)

import { client } from "@/sanity/lib/client";
import { Photo } from "@/types/ISanity";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import PhotosGallery from "./PhotoGallery";

export const revalidate = 60; // Optional revalidation time (ISR)

// Server-side function to fetch photo data
const getPhotos = async (): Promise<Photo[]> => {
  const query = `*[_type == "photo"] | order(uploadTime desc) {
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
    uploadTime  // Make sure to include the uploadTime field
}`;

  const photos = await client.fetch(query);
  return photos;
}

// Server Component
export default async function PhotosPage() {
  const photos = await getPhotos(); // Fetch photo data on the server

  return (
    <Container>
      <PageIntro title="Photos" centered />

      {/* Pass the fetched photos to the client-side component */}
      <PhotosGallery photos={photos} />
    </Container>
  );
}
