import { z } from '@hono/zod-openapi';

export const errorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    reason: z.string(),
    issues: z
      .array(z.object({ message: z.string(), path: z.array(z.string()) }))
      .optional(),
  }),
});

export const paginationSchema = z.object({
  limit: z.coerce
    .number({ invalid_type_error: 'query limit must be a number' })
    .positive({ message: 'query limit must be geater then zero' })
    .int({ message: 'query limit must be an integer' })
    .max(100, { message: 'query limit must be less then or equal to 100' })
    .optional()
    .openapi({ example: 10 }),
  cursor: z
    .string({ invalid_type_error: 'query cursor must be an Id string' })
    .optional()
    .openapi({ example: 'abqdj6xe8puto1j83soz3bml' }),
});

export const searchPropertyUnitSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  rent: z.number(),
  immediate: z.number(),
  availableDate: z.string().optional(),
  shortterm: z.number(),
  longterm: z.number(),
  furnished: z.number(),
  heat: z.number(),
  water: z.number(),
  electricity: z.number(),
  internet: z.number(),
  television: z.number(),
  bedroom: z.string(),
  bathroom: z.string(),
  listingId: z.number(),
  address: z.string(),
  community: z.string(),
  type: z.string(),
  smoking: z.number(),
  cats: z.number(),
  dogs: z.number(),
  parking: z.string().optional(),
  feature: z.string().optional(),
  imageId: z.string(),
  latitude: z.string(),
  longitude: z.string(),
});

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

const textFields = ['bedroom', 'bathroom', 'type'] as const;

const textMatchFields = ['address', 'community', 'parking', 'feature'] as const;

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
  z.number(),
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

export const andSchema = z.object({
  and: searchSchema.optional(),
});

export type SearchSchema = z.infer<typeof searchSchema>;
