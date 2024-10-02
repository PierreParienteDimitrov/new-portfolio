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
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {photos.map((photo, index) => (
                    <div key={index} className="w-full mb-4">
                        <Image
                            src={photo.photo.asset.url}
                            alt={photo.name}
                            width={photo.photo.asset.metadata.dimensions.width}
                            height={photo.photo.asset.metadata.dimensions.height}
                            objectFit="cover"
                            className="rounded-lg cursor-pointer"
                            onClick={() => handlePhotoClick(index)}
                        />
                    </div>
                ))}
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
