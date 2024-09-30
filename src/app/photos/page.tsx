import { Container } from '@/components/Container';
import { PageIntro } from '@/components/PageIntro';
import { client, urlFor } from '@/sanity/lib/client';
import { Photo } from '@/types/ISanity';
import Image from 'next/image';


async function getPhotos(): Promise<Photo[]> {
    const query = `*[_type == "photo"] {
        name,
        location,
        description,
        photo,
        meta
      }`;

    const photos = await client.fetch(query);
    return photos;
}

export default async function PhotosPage() {
    const photos = await getPhotos();

    return (
        <>
            <article className="mt-24 sm:mt-32 lg:mt-40">
                <PageIntro title="Photos" centered>
                </PageIntro>

                <Container>
                    {photos.map((photo) => {
                        return (
                            <div key={photo.name}>
                                <div className='w-10/12 m-auto flex flex-col space-4-16 items-left mb-32'>
                                    {photo.photo &&
                                        <Image
                                            src={urlFor(photo.photo).url()}
                                            alt={photo.name}
                                            layout='responsive'
                                            quality={100}
                                            width={10} // Set a width of 100%
                                            height={76} // Maintain aspect ratio
                                            priority
                                        />
                                    }
                                    <div className='flex space-x-4 justify-items-center'>
                                        <h4>{photo.name}</h4>
                                        <h4>-</h4>
                                        <h4>{photo.location}</h4>
                                        <h4>-</h4>
                                        <h4>{photo.description}</h4>
                                    </div>
                                </div>
                            </div>)
                    })}
                </Container>


            </article>

        </>
    );
}
