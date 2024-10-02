export interface Photo {
    name: string;
    location: string;
    description: string;
    photo: {
        asset: {
            _id: string;
            url: string;
            metadata: {
                dimensions: {
                    width: number;
                    height: number;
                };
            };
        };
    };
    meta: any; // Define the meta type if you know its structure
}

export interface MusicTrack {
    name: string;
    description: string;
    musicUrl: string;
    meta: string;
    trackNumber: number;
}

export interface Album {
    album: {
        name: string;          // Name of the album
        description?: string;  // Optional description of the album
        composer: string;      // Composer of the album
        releaseDate?: string;  // Optional release date of the album
        cover?: {              // Optional cover image
            asset: {
                url: string;   // URL of the album cover image
            };
        };
    };
    tracks: MusicTrack[];     // List of tracks in the album
}