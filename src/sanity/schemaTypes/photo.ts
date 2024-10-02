import { defineField, defineType } from 'sanity';

export const photo = defineType({
    name: 'photo',
    title: 'Photo',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Photo Name',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'photo',
            title: 'Photo File',
            type: 'image',  // Ensure this is correctly set as 'image'
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'meta',
            title: 'Meta Information',
            type: 'string',
        }),
        defineField({
            name: 'uploadTime',
            title: 'Upload Time',
            type: 'datetime',  // You can store the upload time as a datetime field
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
            },
        }),
    ],
});
