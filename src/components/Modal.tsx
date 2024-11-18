import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';
import { Photo } from '@/types/ISanity';
import { ArrowLeftIcon, ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface ModalProps {
    photos: Photo[];
    selectedPhotoIndex: number;
    handleClose: () => void;
    handleNextPhoto: () => void;
    handlePrevPhoto: () => void;
}

const Modal = ({
    photos,
    selectedPhotoIndex,
    handleClose,
    handleNextPhoto,
    handlePrevPhoto,
}: ModalProps) => {
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const modalRoot = document.getElementById('modal-root');

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        preloadPhotos();
    }, [selectedPhotoIndex]);

    // Preload images for smoother navigation
    const preloadPhotos = () => {
        const preloadIndexes = [selectedPhotoIndex - 1, selectedPhotoIndex + 1];
        preloadIndexes.forEach((index) => {
            if (index >= 0 && index < photos.length) {
                const img = document.createElement('img');
                img.src = photos[index]?.photo.asset.url;
            }
        });
    };

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                handleNextPhoto();
            } else if (e.key === 'ArrowLeft') {
                handlePrevPhoto();
            } else if (e.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleNextPhoto, handlePrevPhoto, handleClose]);

    // Ensure selectedPhotoIndex is valid
    if (
        !mounted ||
        selectedPhotoIndex === null ||
        selectedPhotoIndex < 0 ||
        selectedPhotoIndex >= photos.length ||
        !modalRoot
    )
        return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="relative w-full h-full max-w-6xl p-8 bg-white flex flex-col items-center">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-black hover:text-gray-300 text-2xl p-2 cursor-pointer"
                    onClick={handleClose}
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>

                {/* Image Display */}
                <div className="relative w-full h-4/5 mb-4">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <iframe
                                src="https://lottie.host/embed/ef093856-51ce-488c-b0f5-3f1a2ac3c2c4/zvzKfBfedv.json"
                                className="w-20 h-20"
                                title="Loading animation"
                            />
                        </div>
                    )}
                    <Image
                        src={photos[selectedPhotoIndex].photo.asset.url}
                        alt={photos[selectedPhotoIndex].name}
                        fill
                        quality={100}
                        priority
                        className={`object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoadingComplete={handleImageLoad}
                    />
                </div>

                {/* Photo Information */}
                <div className="relative w-full flex justify-between items-center">
                    {/* Left Arrow */}
                    <button
                        className="absolute left-0 text-gray-700 disabled:text-gray-400 p-4"
                        onClick={handlePrevPhoto}
                        disabled={selectedPhotoIndex === 0}
                        aria-label="Previous"
                    >
                        <ArrowLeftIcon className="w-8 h-8" />
                    </button>

                    <div className="text-center text-black mx-auto">
                        <h2 className="text-lg font-bold">{photos[selectedPhotoIndex]?.name}</h2>
                        <p className="text-sm text-gray-600">{photos[selectedPhotoIndex]?.location}</p>
                        <p className="text-xs text-gray-500">{photos[selectedPhotoIndex]?.description}</p>
                    </div>

                    {/* Right Arrow */}
                    <button
                        className="absolute right-0 text-gray-700 disabled:text-gray-400 p-4"
                        onClick={handleNextPhoto}
                        disabled={selectedPhotoIndex === photos.length - 1}
                        aria-label="Next"
                    >
                        <ArrowRightIcon className="w-8 h-8" />
                    </button>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
