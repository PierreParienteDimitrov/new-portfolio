import { type SchemaTypeDefinition } from 'sanity'
import { photo } from './photo';
import { music } from './music';
import { album } from './album';
import { photoAlbums } from './photoAlbums';



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [photo, music, album, photoAlbums],
}
