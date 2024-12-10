import { defineField, defineType } from 'sanity';

export const photoAlbums = defineType({
    name: 'photoAlbum', // Updated to avoid spaces in schema name
    title: 'Photo Album',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Album Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Album Description',
            type: 'text',
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
        defineField({
            name: 'link',
            title: 'Album Link',
            type: 'object',  // Define it as an object for flexibility
            fields: [
                defineField({
                    name: 'url',
                    title: 'URL',
                    type: 'url',  // URL type ensures proper formatting
                    validation: (Rule) => Rule.uri({
                        scheme: ['http', 'https'],  // Limit to http/https
                    }),
                }),
                defineField({
                    name: 'text',
                    title: 'Link Text',
                    type: 'string',  // Optional display text for the link
                }),
            ],
        }),
    ],
});


