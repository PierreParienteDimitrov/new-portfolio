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

  // Sort by name alphabetically within the same day (uploadTime)
  photos.sort((a: { uploadTime: string | number | Date; name: string; }, b: { uploadTime: string | number | Date; name: any; }) => {
    const dateA = new Date(a.uploadTime).toDateString();
    const dateB = new Date(b.uploadTime).toDateString();

    if (dateA === dateB) {
      return a.name.localeCompare(b.name);
    }
    return new Date(b.uploadTime).getTime() - new Date(a.uploadTime).getTime(); // Descending order by uploadTime
  });

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
