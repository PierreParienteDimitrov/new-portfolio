// app/photos/page.tsx (Server Component)

import { client } from "@/sanity/lib/client";
import { Photo } from "@/types/ISanity";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import PhotosGallery from "./PhotoGallery";

// Set the revalidation time (ISR)
export const revalidate = 60;

// Server-side function to fetch photo data with pagination
const getPhotos = async (start = 0, limit = 12): Promise<Photo[]> => {
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
  return photos;
};

// Server Component
export default async function PhotosPage() {
  const initialPhotos = await getPhotos(); // Fetch the first set of photos on the server

  return (
    <Container>
      <PageIntro title="Photos" centered />
      <PhotosGallery initialPhotos={initialPhotos} /> {/* Pass initialPhotos */}
    </Container>
  );
}
