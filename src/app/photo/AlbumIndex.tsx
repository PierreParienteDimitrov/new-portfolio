"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PhotoAlbum } from "@/types/ISanity";
import Modal from '@/components/Modal';
import { Container } from '@/components/Container';
import Link from 'next/link';

interface PhotosGalleryProps {
    albums: PhotoAlbum[];
}

// Client-side Photo Gallery component
export default function AlbumIndex({ albums }: PhotosGalleryProps) {
    return (
        <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
                {albums.map((album, index) => (
                    <Link key={index}
                        href={album.link?.url || "#"} passHref target="_blank">
                        <div className="relative w-full h-64 overflow-hidden">
                            <div className="group relative w-full h-full">
                                <Image
                                    src={album.cover.asset.url}
                                    alt={album.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        </div>
                        <h4 className="mt-4 text-lg group-hover:text-blue-500">
                            {album.title}
                        </h4>
                        <p className="text-sm text-gray-600">{album.description}</p>
                    </Link>
                ))}
            </div>
        </Container>
    )
}



