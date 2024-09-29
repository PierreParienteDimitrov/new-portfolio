export interface Photo {
    photo(photo: any): unknown;
    imageUrl: string | undefined;
    name: string;
    location: string;
    description: string;
    photoUrl: string;
    meta: string;
}

export interface Music {
    name: string;
    description: string;
    musicUrl: string;
    meta: string;
}