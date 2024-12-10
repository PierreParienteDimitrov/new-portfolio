"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PhotoAlbum } from "@/types/ISanity";
import Modal from '@/components/Modal';

interface PhotosGalleryProps {
    albums: PhotoAlbum[];
}

// Client-side Photo Gallery component
export default function AlbumIndex({ albums }: PhotosGalleryProps) {
    return (
        <>
            {albums.map((album) => (
                <div key={album.title} style={{ marginBottom: "20px" }}>
                    <h2>{album.title}</h2>
                    <p>{album.description}</p>
                    {album.cover && (
                        <img
                            src={album.cover.asset.url}
                            alt={album.title}
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    )}
                    {album.link ? (
                        <a href={album.link.url} target="_blank" rel="noopener noreferrer">
                            {album.link.text || "View Album"}
                        </a>
                    ) : (
                        <p>No link available for this album.</p>
                    )}
                </div>
            ))}
        </>
    );
}

