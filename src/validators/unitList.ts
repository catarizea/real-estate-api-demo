import { z } from '@hono/zod-openapi';

import { limitSchema } from './pagination';

const tinyIntValues = {
  t: 1,
  f: 0,
} as const;

const idSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy id',
  })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const propertyIdSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy propertyId',
  })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const floorPlanIdSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy floorPlanId',
  })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const bedroomIdSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy bedroomId',
  })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const bathroomIdSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy bathroomId',
  })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const rentSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy rent',
  })
  .int({ message: 'query cursor must be an integer for orderBy rent' })
  .openapi({ example: 1 });

const orderSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy order',
  })
  .int({ message: 'query cursor must be an integer for orderBy order' })
  .openapi({ example: 1 });

const depositSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy deposit',
  })
  .int({ message: 'query cursor must be an integer for orderBy deposit' })
  .openapi({ example: 1 });

const surfaceSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy surface',
  })
  .int({ message: 'query cursor must be an integer for orderBy surface' })
  .openapi({ example: 1 });

const nameSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy name',
  })
  .openapi({ example: 'some string' });

const unitNumberSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy unitNumber',
  })
  .openapi({ example: 'some string' });

const unitNameSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy unitName',
  })
  .openapi({ example: 'some string' });

const createdAtSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy createdAt',
  })
  .datetime({
    message: 'query cursor must be a valid ISO 8601 date for orderBy createdAt',
  })
  .openapi({ example: '2024-01-01T00:00:00Z' });

const updatedAtSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy updatedAt',
  })
  .datetime({
    message: 'query cursor must be a valid ISO 8601 date for orderBy updatedAt',
  })
  .openapi({ example: '2024-01-01T00:00:00Z' });

const availableDateSchema = z.coerce
  .date({
    invalid_type_error:
      'query cursor must be a date string like "2024-01-01" for orderBy availableDate',
  })
  .openapi({ example: '2024-01-01' });

const availableSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy available',
  })
  .openapi({ example: 1 });

const immediateSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy immediate',
  })
  .openapi({ example: 1 });

const shorttermSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy shortterm',
  })
  .openapi({ example: 1 });

const longtermSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy longterm',
  })
  .openapi({ example: 1 });

const furnishedSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy furnished',
  })
  .openapi({ example: 1 });

const heatSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy heat',
  })
  .openapi({ example: 1 });

const waterSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy water',
  })
  .openapi({ example: 1 });

const electricitySchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy electricity',
  })
  .openapi({ example: 1 });

const internetSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy internet',
  })
  .openapi({ example: 1 });

const televisionSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy television',
  })
  .openapi({ example: 1 });

const publishedSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy published',
  })
  .openapi({ example: 1 });

export const getUnitCursorValidatorByOrderBy = (orderBy: string) => {
  switch (orderBy) {
    case 'id-asc':
    case 'id-desc':
      return idSchema;

    case 'propertyId-asc':
    case 'propertyId-desc':
      return propertyIdSchema;

    case 'floorPlanId-asc':
    case 'floorPlanId-desc':
      return floorPlanIdSchema;

    case 'bedroomId-asc':
    case 'bedroomId-desc':
      return bedroomIdSchema;

    case 'bathroomId-asc':
    case 'bathroomId-desc':
      return bathroomIdSchema;

    case 'rent-asc':
    case 'rent-desc':
      return rentSchema;

    case 'order-asc':
    case 'order-desc':
      return orderSchema;

    case 'deposit-asc':
    case 'deposit-desc':
      return depositSchema;

    case 'surface-asc':
    case 'surface-desc':
      return surfaceSchema;

    case 'name-asc':
    case 'name-desc':
      return nameSchema;

    case 'unitNumber-asc':
    case 'unitNumber-desc':
      return unitNumberSchema;

    case 'unitName-asc':
    case 'unitName-desc':
      return unitNameSchema;

    case 'createdAt-asc':
    case 'createdAt-desc':
      return createdAtSchema;

    case 'updatedAt-asc':
    case 'updatedAt-desc':
      return updatedAtSchema;

    case 'availableDate-asc':
    case 'availableDate-desc':
      return availableDateSchema;

    case 'available-asc':
    case 'available-desc':
      return availableSchema;

    case 'immediate-asc':
    case 'immediate-desc':
      return immediateSchema;

    case 'shortterm-asc':
    case 'shortterm-desc':
      return shorttermSchema;

    case 'longterm-asc':
    case 'longterm-desc':
      return longtermSchema;

    case 'furnished-asc':
    case 'furnished-desc':
      return furnishedSchema;

    case 'heat-asc':
    case 'heat-desc':
      return heatSchema;

    case 'water-asc':
    case 'water-desc':
      return waterSchema;

    case 'electricity-asc':
    case 'electricity-desc':
      return electricitySchema;

    case 'internet-asc':
    case 'internet-desc':
      return internetSchema;

    case 'television-asc':
    case 'television-desc':
      return televisionSchema;

    case 'published-asc':
    case 'published-desc':
      return publishedSchema;

    default:
      return z.never();
  }
};

export const paginationUnitOrderSchema = z.object({
  limit: limitSchema,
  orderBy: z
    .enum([
      'id-asc',
      'id-desc',
      'propertyId-asc',
      'propertyId-desc',
      'floorPlanId-asc',
      'floorPlanId-desc',
      'bedroomId-asc',
      'bedroomId-desc',
      'bathroomId-asc',
      'bathroomId-desc',
      'rent-asc',
      'rent-desc',
      'order-asc',
      'order-desc',
      'deposit-asc',
      'deposit-desc',
      'surface-asc',
      'surface-desc',
      'name-asc',
      'name-desc',
      'unitNumber-asc',
      'unitNumber-desc',
      'unitName-asc',
      'unitName-desc',
      'createdAt-asc',
      'createdAt-desc',
      'updatedAt-asc',
      'updatedAt-desc',
      'availableDate-asc',
      'availableDate-desc',
      'available-asc',
      'available-desc',
      'immediate-asc',
      'immediate-desc',
      'shortterm-asc',
      'shortterm-desc',
      'longterm-asc',
      'longterm-desc',
      'furnished-asc',
      'furnished-desc',
      'heat-asc',
      'heat-desc',
      'water-asc',
      'water-desc',
      'electricity-asc',
      'electricity-desc',
      'internet-asc',
      'internet-desc',
      'television-asc',
      'television-desc',
      'published-asc',
      'published-desc',
    ])
    .optional(),
  cursor: z
    .union([
      idSchema,
      propertyIdSchema,
      floorPlanIdSchema,
      bedroomIdSchema,
      bathroomIdSchema,
      rentSchema,
      orderSchema,
      depositSchema,
      surfaceSchema,
      nameSchema,
      unitNumberSchema,
      unitNameSchema,
      createdAtSchema,
      updatedAtSchema,
      availableDateSchema,
      availableSchema,
      immediateSchema,
      shorttermSchema,
      longtermSchema,
      furnishedSchema,
      heatSchema,
      waterSchema,
      electricitySchema,
      internetSchema,
      televisionSchema,
      publishedSchema,
    ])
    .optional(),
});

const textFields = [
  'id',
  'propertyId',
  'floorPlanId',
  'bedroomId',
  'bathroomId',
  'name',
  'unitNumber',
  'unitName',
] as const;

const numericFields = ['rent', 'order', 'deposit', 'surface'] as const;

const dateFields = ['createdAt', 'updatedAt'] as const;

const eqTextSchema = z.tuple([z.enum(['eq']), z.enum(textFields), z.string()]);

const tinyIntFields = [
  'available',
  'immediate',
  'shortterm',
  'longterm',
  'furnished',
  'heat',
  'water',
  'electricity',
  'internet',
  'television',
  'published',
] as const;

const eqTinyIntSchema = z.tuple([
  z.enum(['eq']),
  z.enum(tinyIntFields),
  z.nativeEnum(tinyIntValues),
]);

const dateOnlyFields = ['availableDate'] as const;

const dateOnlySingleSchema = z.tuple([
  z.enum(['lt', 'gt']),
  z.enum(dateOnlyFields),
  z.coerce.date(),
]);

const dateOnlyBetweenSchema = z.tuple([
  z.enum(['between']),
  z.enum(dateOnlyFields),
  z.coerce.date(),
  z.coerce.date(),
]);

const numericSchemaSingle = z.tuple([
  z.enum(['eq', 'lt', 'gt']),
  z.enum(numericFields),
  z.number().int(),
]);

const numericSchemaBetween = z.tuple([
  z.enum(['between']),
  z.enum(numericFields),
  z.number().int(),
  z.number().int(),
]);

const dateSchemaSingle = z.tuple([
  z.enum(['lt', 'gt']),
  z.enum(dateFields),
  z.string().datetime(),
]);

const dateSchemaBetween = z.tuple([
  z.enum(['between']),
  z.enum(dateFields),
  z.string().datetime(),
  z.string().datetime(),
]);

const orSchema = z.tuple([
  z.enum(['or']),
  z.array(
    z.union([
      eqTextSchema,
      dateSchemaSingle,
      dateSchemaBetween,
      numericSchemaSingle,
      numericSchemaBetween,
      eqTinyIntSchema,
      dateOnlySingleSchema,
      dateOnlyBetweenSchema,
    ]),
  ),
]);

const unitListSchema = z.array(
  z.union([
    eqTextSchema,
    dateSchemaSingle,
    dateSchemaBetween,
    numericSchemaSingle,
    numericSchemaBetween,
    eqTinyIntSchema,
    dateOnlySingleSchema,
    dateOnlyBetweenSchema,
    orSchema,
  ]),
);

export const bodyUnitListSchema = z.object({
  and: unitListSchema.optional(),
});

export type UnitListSchema = z.infer<typeof unitListSchema>;
