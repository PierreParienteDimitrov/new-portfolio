"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { client, urlFor } from '@/sanity/lib/client';
import { Photo } from '@/types/ISanity';
import { Container } from '@/components/Container';
import { PageIntro } from '@/components/PageIntro';
import Modal from '@/components/Modal';

const getPhotos = async (): Promise<Photo[]> => {
    const query = `*[_type == "photo"] {
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
        meta
      }`;

    const photos = await client.fetch(query);
    return photos;
};

export default function PhotosPage() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

    console.log(photos.length);

    // Fetch photos when component mounts
    useEffect(() => {
        const fetchData = async () => {
            const data = await getPhotos();
            setPhotos(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    // Handle opening full-screen modal
    const handlePhotoClick = (index: number) => {
        setSelectedPhotoIndex(index);
    };

    // Handle closing full-screen modal
    const handleClose = () => {
        setSelectedPhotoIndex(null);
    };

    // Handle navigation in the full-screen view (next and previous)
    const handleNextPhoto = () => {
        if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
            setSelectedPhotoIndex(selectedPhotoIndex + 1);
        }
    };

    const handlePrevPhoto = () => {
        if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
            setSelectedPhotoIndex(selectedPhotoIndex - 1);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Container>
                <PageIntro title="Photos" centered />

                {/* Photo Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                        <div
                            key={photo.name}
                            className="relative w-full cursor-pointer" // Make the div width 100% and let the aspect ratio adjust dynamically
                            onClick={() => handlePhotoClick(index)}
                        >
                            <Image
                                src={urlFor(photo.photo).url()}
                                alt={photo.name}
                                width={photo.photo.asset.metadata.dimensions.width}   // Set the natural width
                                height={photo.photo.asset.metadata.dimensions.height} // Set the natural height
                                quality={100}
                                priority
                            />
                        </div>
                    ))}
                </div>

                {/* Full-Screen Modal */}
                {selectedPhotoIndex !== null && (
                    < Modal
                        photos={photos}
                        selectedPhotoIndex={selectedPhotoIndex!}
                        handleClose={handleClose}
                        handleNextPhoto={handleNextPhoto}
                        handlePrevPhoto={handlePrevPhoto}
                    />
                )}
            </Container>
        </>
    );
}
