import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';
import { Photo } from '@/types/ISanity';
import { ArrowLongLeftIcon, ArrowLongRightIcon, XMarkIcon } from '@heroicons/react/20/solid';

const Modal = ({
    photos,
    selectedPhotoIndex,
    handleClose,
    handleNextPhoto,
    handlePrevPhoto,
}: {
    photos: Photo[];
    selectedPhotoIndex: number;
    handleClose: () => void;
    handleNextPhoto: () => void;
    handlePrevPhoto: () => void;
}) => {
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const modalRoot = document.getElementById('modal-root');

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        setIsLoading(true);
    }, [selectedPhotoIndex]);

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

        if (mounted) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [mounted, handleNextPhoto, handlePrevPhoto, handleClose]);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    if (!mounted || selectedPhotoIndex === null || !modalRoot) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="relative w-full h-full max-w-6xl p-8 bg-white flex flex-col items-center">
                <div className="flex space-x-0 items-center absolute top-4 right-4 text-black hover:text-gray-300 text-3xl p-2 cursor-pointer" onClick={handleClose}>
                    <XMarkIcon className="w-6 h-6" />
                </div>
                <div className="relative w-full h-4/5 mb-8">
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
                        src={urlFor(photos[selectedPhotoIndex].photo).url()}
                        alt={photos[selectedPhotoIndex].name}
                        fill
                        quality={100}
                        priority
                        className={`object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoadingComplete={handleImageLoad}
                    />
                </div>

                {/* Image Information */}
                <div className="w-full text-center text-black">
                    <h4 className="">{photos[selectedPhotoIndex].name}</h4>
                    <p className="text-s text-gray-700 mb-4">{photos[selectedPhotoIndex].location}</p>
                    <p className="text-xs text-gray-700">{photos[selectedPhotoIndex].description}</p>
                </div>

                {/* Navigation Buttons */}
                <div className="absolute bottom-32 left-32 right-32 flex justify-between">
                    <button
                        className="text-gray-700 disabled:text-gray-400"
                        onClick={handlePrevPhoto}
                        disabled={selectedPhotoIndex === 0}
                        aria-label="Previous"
                    >
                        <ArrowLongLeftIcon className="w-8 h-8" />
                    </button>
                    <button
                        className="text-gray-700 disabled:text-gray-400"
                        onClick={handleNextPhoto}
                        disabled={selectedPhotoIndex === photos.length - 1}
                        aria-label="Next"
                    >
                        <ArrowLongRightIcon className="w-8 h-8" />
                    </button>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
