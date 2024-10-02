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
    // Create portal to attach the modal to
    const [mounted, setMounted] = useState(false);
    const modalRoot = document.getElementById('modal-root'); // The root div for the modal

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted || selectedPhotoIndex === null || !modalRoot) return null;

    // Render the modal via a portal to the modal-root
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
                        <Image
                            src={urlFor(photos[selectedPhotoIndex].photo).url()}
                            alt={photos[selectedPhotoIndex].name}
                            fill
                            quality={100}
                            priority
                            className="object-contain" // Ensures the image fits nicely within the modal
                        />
                    </div>

                    {/* Image Information */}
                    <div className='text-center'>
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
