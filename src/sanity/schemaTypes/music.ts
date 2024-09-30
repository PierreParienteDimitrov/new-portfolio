import { defineField, defineType } from 'sanity';

export const music = defineType({
    name: 'music',
    title: 'Music',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Track Name',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'musicFile',
            title: 'Music File',
            type: 'file',
            options: { accept: '.mp3,.wav,.flac' },
        }),
        defineField({
            name: 'meta',
            title: 'Meta Information',
            type: 'string',
        }),
        defineField({
            name: 'trackNumber',
            title: 'Track number',
            type: 'number',
        }),
    ],
});
