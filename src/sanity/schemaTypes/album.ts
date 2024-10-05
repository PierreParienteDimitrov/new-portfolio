import { defineField, defineType } from 'sanity';

export const album = defineType({
    name: 'album',
    title: 'Album',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Album Name',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Album Description',
            type: 'text',
        }),
        defineField({
            name: 'composer',
            title: 'Composer',
            type: 'string',
        }),
        defineField({
            name: 'releaseDate',
            title: 'Release Date',
            type: 'date',
        }),
        defineField({
            name: 'cover',
            title: 'Album Cover',
            type: 'image',  // Image type for the album cover
            options: {
                hotspot: true,  // Allows for better control over cropping
            },
        }),
    ],
});

