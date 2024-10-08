import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';
import { Photo } from '@/types/ISanity';

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
    const [mounted, setMounted] = useState(false); // State to check if the modal is mounted
    const [isLoading, setIsLoading] = useState(true); // State to track loading
    const modalRoot = document.getElementById('modal-root'); // The root div for the modal

    // Mark as mounted
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Set loading to true when the selected photo index changes
    useEffect(() => {
        setIsLoading(true);
    }, [selectedPhotoIndex]);

    if (!mounted || selectedPhotoIndex === null || !modalRoot) return null;

    // Handle image load
    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white ">
            {/* Outer Container for Modal Content */}
            <div className="relative w-full h-full flex items-center justify-center">
                <button
                    className="absolute top-4 right-4 text-black hover:text-gray-300 text-2xl"
                    onClick={handleClose}
                >
                    ✕
                </button>

                <div className="relative w-full h-full max-w-6xl p-8">
                    {/* Full-screen Image */}
                    <div className="relative w-full h-4/5">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* <div className="w-12 h-12 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div> */}
                                <iframe src="https://lottie.host/embed/ef093856-51ce-488c-b0f5-3f1a2ac3c2c4/zvzKfBfedv.json" className='w-full h-96'></iframe>
                            </div>
                        )}
                        <Image
                            src={urlFor(photos[selectedPhotoIndex].photo).url()}
                            alt={photos[selectedPhotoIndex].name}
                            fill
                            quality={100}
                            priority
                            className={`object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`} // Smooth fade-in transition
                            onLoad={handleImageLoad} // Handle image load
                        />
                    </div>

                    {/* Image Information */}
                    <div className="text-center">
                        <div className="mt-4 text-black flex space-x-2 justify-center w-full">
                            <p className="text-m">{photos[selectedPhotoIndex].name} - </p>
                            <p className="text-m">{photos[selectedPhotoIndex].location} </p>
                        </div>
                        <h5 className="text-m">{photos[selectedPhotoIndex].description}</h5>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-4">
                        <button
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                            onClick={handlePrevPhoto}
                            disabled={selectedPhotoIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                            onClick={handleNextPhoto}
                            disabled={selectedPhotoIndex === photos.length - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        modalRoot // Attach the modal to the root div
    );
};

export default Modal;
