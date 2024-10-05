// app/photos/PhotosGallery.tsx (Client Component)

"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/ISanity';
import Modal from '@/components/Modal';

interface PhotosGalleryProps {
    photos: Photo[];
}

// Client-side Photo Gallery component
export default function PhotosGallery({ photos }: PhotosGalleryProps) {
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

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

    return (
        <>
            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => {
                    // Extract the dimensions of the image to determine if it's vertical or horizontal
                    const { width, height } = photo.photo.asset.metadata?.dimensions ?? { width: 500, height: 500 };
                    const aspectRatio = width / height; // Calculate the aspect ratio

                    return (
                        <div
                            key={index}
                            className={`relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${aspectRatio > 1 ? 'w-full h-[300px]' : 'w-auto h-[300px]'}`}
                        >
                            <Image
                                src={photo.photo.asset.url}
                                alt={photo.name}
                                layout="fill"
                                objectFit="cover"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                onClick={() => handlePhotoClick(index)}
                            />
                        </div>
                    );
                })}
            </div>




            {/* Full-Screen Modal */}
            {selectedPhotoIndex !== null && (
                <Modal
                    photos={photos}
                    selectedPhotoIndex={selectedPhotoIndex!}
                    handleClose={handleClose}
                    handleNextPhoto={handleNextPhoto}
                    handlePrevPhoto={handlePrevPhoto}
                />
            )}
        </>
    );
}
