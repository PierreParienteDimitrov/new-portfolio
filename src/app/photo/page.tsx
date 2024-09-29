import { client, urlFor } from '@/sanity/lib/client';
import { Photo } from '@/types/ISanity';

async function getPhotos(): Promise<Photo[]> {
    const query = `*[_type == "photo"] {
       name,
       location,
       description,
       photo,  // Fetch the entire image field to use with urlFor
       meta
    }`;
    const photos = await client.fetch(query);
    return photos;
}

export default async function PhotosPage() {
    const photos = await getPhotos();

    return (
        <div>
            <h1>Photos</h1>
            {photos.map((photo) => {

                return (
                    <div key={photo.name}>
                        <h2>{photo.name}</h2>
                        <p>{photo.location}</p>
                        {/* Use urlFor to generate the image URL from the asset */}
                        {photo.photo && <img src={urlFor(photo.photo).url()} alt={photo.name} />}
                    </div>
                );
            })}
        </div>
    );
}
