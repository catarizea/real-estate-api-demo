import { z } from '@hono/zod-openapi';

export const searchPropertyUnitSchema = z.object({
  id: z.string(),
  propertyId: z.string().optional(),
  rent: z.number().optional(),
  immediate: z.number().optional(),
  availableDate: z.string().optional(),
  shortterm: z.number().optional(),
  longterm: z.number().optional(),
  furnished: z.number().optional(),
  heat: z.number().optional(),
  water: z.number().optional(),
  electricity: z.number().optional(),
  internet: z.number().optional(),
  television: z.number().optional(),
  bedroom: z.string().optional(),
  bathroom: z.string().optional(),
  listingId: z.number().optional(),
  address: z.string().optional(),
  community: z.string().optional(),
  type: z.string().optional(),
  smoking: z.number().optional(),
  cats: z.number().optional(),
  dogs: z.number().optional(),
  parking: z.string().optional(),
  feature: z.string().optional(),
  imageId: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

const fieldsSchema = z.array(
  z.enum([
    'propertyId',
    'rent',
    'immediate',
    'availableDate',
    'shortterm',
    'longterm',
    'furnished',
    'heat',
    'water',
    'electricity',
    'internet',
    'television',
    'bedroom',
    'bathroom',
    'listingId',
    'address',
    'community',
    'type',
    'smoking',
    'cats',
    'dogs',
    'parking',
    'feature',
    'imageId',
    'latitude',
    'longitude',
  ]),
);

const numericFields = [
  'immediate',
  'shortterm',
  'longterm',
  'furnished',
  'heat',
  'water',
  'electricity',
  'internet',
  'television',
  'smoking',
  'cats',
  'dogs',
  'listingId',
] as const;

const textFields = [
  'id',
  'propertyId',
  'bedroom',
  'bathroom',
  'type',
  'community',
] as const;

const textMatchFields = ['address', 'parking', 'feature'] as const;

const aroundLatLngSchema = z.tuple([
  z.enum(['aroundLatLng']),
  z.number(),
  z.number(),
  z.number().int(),
]);

const eqNumericSchema = z.tuple([
  z.enum(['eq']),
  z.enum(numericFields),
  z.number(),
]);

const eqStringSchema = z.tuple([
  z.enum(['eq']),
  z.enum(textFields),
  z.string(),
]);

const likeSchema = z.tuple([
  z.enum(['like']),
  z.enum(textMatchFields),
  z.string(),
]);

const betweenSchema = z.tuple([
  z.enum(['between']),
  z.enum(['rent']),
  z.number().int(),
  z.number().int(),
]);

const orSchema = z.tuple([
  z.enum(['or']),
  z.array(z.union([eqNumericSchema, eqStringSchema])),
]);

const searchSchema = z.array(
  z.union([
    eqNumericSchema,
    eqStringSchema,
    likeSchema,
    orSchema,
    betweenSchema,
    aroundLatLngSchema,
  ]),
);

export const bodySearchSchema = z.object({
  and: searchSchema.optional(),
  fields: fieldsSchema.optional(),
});

export type SearchSchema = z.infer<typeof searchSchema>;
export type FieldsSchema = z.infer<typeof fieldsSchema>;
