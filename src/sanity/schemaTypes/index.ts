import { type SchemaTypeDefinition } from 'sanity'
import { photo } from './photo';
import { music } from './music';
import { album } from './album';


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [photo, music, album],
}
