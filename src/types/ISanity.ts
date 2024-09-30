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

export interface Music {
    name: string;
    description: string;
    musicUrl: string;
    meta: string;
}