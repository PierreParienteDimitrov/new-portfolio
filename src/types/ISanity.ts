// Define the Album interface
export interface Album {
    name: string;
    description?: string;
    composer?: string;
    releaseDate?: string | null;
    cover?: {
        asset: {
            url: string;  // URL of the cover image
            metadata?: {
                dimensions?: {
                    width: number;
                    height: number;
                };
            };
        };
    };
}

// Define the MusicTrack interface
export interface MusicTrack {
    name: string;
    description?: string;
    musicUrl: string;
    meta?: string;
    trackNumber: number;
    album?: Album | null; // Album could be null or undefined
}

// Define GroupedAlbum interface for the reduced output
export interface GroupedAlbum {
    name: string;
    description: string;
    composer?: string;
    releaseDate?: string;
    coverUrl?: string;
    link?: {
        url: string; // URL to the album
        text?: string; // Optional display text for the link
    };
}

export interface Photo {
    name: string;
    location: string;
    description: string;
    photo: {
        asset: {
            _id: string;
            url: string;
            metadata?: {
                dimensions?: {
                    width: number;
                    height: number;
                };
                lqip?: string; // Low-quality image placeholder (optional)
            };
        };
    };
    meta: string;
    uploadTime: string; // datetime field, represented as an ISO 8601 string
}

export interface PhotosGalleryProps {

    initialPhotos: Photo[];

    // Add other props here if necessary

}


export interface PhotoAlbum {
    title: string; // The album's title
    description: string; // The album's description
    releaseDate: string; // ISO date string for the album's release
    cover: {
        asset: {
            _id: string; // The unique ID of the image asset
            url: string; // The URL of the image
            metadata: {
                dimensions: {
                    width: number; // The width of the image in pixels
                    height: number; // The height of the image in pixels
                };
            };
        };
    };
    link?: {
        url: string; // URL to the album
        text?: string; // Optional display text for the link
    };
}