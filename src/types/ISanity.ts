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
    album: Album;
    tracks: {
        name: string;
        description?: string;
        musicUrl: string;
        meta?: string;
        trackNumber: number;
    }[];
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
