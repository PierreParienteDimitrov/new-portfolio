import { type SchemaTypeDefinition } from 'sanity'
import { photo } from './photo';
import { music } from './music';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [photo, music],
}
