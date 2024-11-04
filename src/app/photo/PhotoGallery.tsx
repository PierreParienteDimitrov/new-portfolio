"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Photo } from '@/types/ISanity';
import Modal from '@/components/Modal';

interface PhotosGalleryProps {
    initialPhotos: Photo[];
}

// Client-side Photo Gallery component
export default function PhotosGallery({ initialPhotos }: PhotosGalleryProps) {
    const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Fetch more photos when needed
    const fetchMorePhotos = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/photos?page=${page}`); // Call the API route to fetch more photos
            const newPhotos: Photo[] = await res.json();

            if (newPhotos.length > 0) {
                setPhotos((prevPhotos) => {
                    const existingIds = new Set(prevPhotos.map((photo) => photo.photo.asset._id));
                    const filteredPhotos = newPhotos.filter(
                        (photo) => !existingIds.has(photo.photo.asset._id)
                    );

                    return [...prevPhotos, ...filteredPhotos];
                });
                setPage(page + 1); // Increment page number
            } else {
                setHasMore(false); // If no more photos, stop fetching
            }
        } catch (error) {
            console.error('Error fetching more photos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle scrolling to detect when to load more photos
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
            fetchMorePhotos(); // Fetch more photos when near the bottom of the page
        }
    };

    // Attach the scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page, hasMore]);

    // Handle opening full-screen modal
    const handlePhotoClick = (index: number) => {
        setSelectedPhotoIndex(index);
    };

    // Handle closing full-screen modal
    const handleClose = () => {
        setSelectedPhotoIndex(null);
    };

    // Handle navigation in the full-screen view (next and previous)
    const handleNextPhoto = async () => {
        if (selectedPhotoIndex !== null) {
            if (selectedPhotoIndex < photos.length - 1) {
                setSelectedPhotoIndex(selectedPhotoIndex + 1);
            } else if (hasMore) {
                await fetchMorePhotos();
                setSelectedPhotoIndex(selectedPhotoIndex + 1);
            }
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
                    const { width, height } = photo.photo.asset.metadata?.dimensions ?? { width: 500, height: 500 };
                    const aspectRatio = width / height;

                    return (
                        <div
                            key={photo.photo.asset._id}
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

            {/* Loading Indicator */}
            {isLoading && <p className="text-center mt-4">Loading more photos...</p>}

            {/* Full-Screen Modal */}
            {selectedPhotoIndex !== null && (
                <Modal
                    photos={photos}
                    selectedPhotoIndex={selectedPhotoIndex}
                    handleClose={handleClose}
                    handleNextPhoto={handleNextPhoto}
                    handlePrevPhoto={handlePrevPhoto}
                />
            )}
        </>
    );
}
