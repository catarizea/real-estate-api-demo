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

const typeIdSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy typeId',
  })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const communityIdSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy communityId',
  })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const cityIdSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy cityId',
  })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const listingIdSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy listingId',
  })
  .int({ message: 'query cursor must be an integer for orderBy listingId' })
  .openapi({ example: 1 });

const yearBuiltSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy yearBuilt',
  })
  .int({ message: 'query cursor must be an integer for orderBy yearBuilt' })
  .openapi({ example: 1 });

const petsFeeSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy petsFee',
  })
  .int({ message: 'query cursor must be an integer for orderBy petsFee' })
  .openapi({ example: 1 });

const customerRankingSchema = z.coerce
  .number({
    invalid_type_error:
      'query cursor must be a number for orderBy customerRanking',
  })
  .int({
    message: 'query cursor must be an integer for orderBy customerRanking',
  })
  .openapi({ example: 1 });

const latitudeSchema = z.coerce
  .number({
    invalid_type_error:
      'query cursor must be a decimal number for orderBy latitude',
  })
  .openapi({ example: 50.14522 });

const longitudeSchema = z.coerce
  .number({
    invalid_type_error:
      'query cursor must be a decimal number for orderBy longitude',
  })
  .openapi({ example: 50.14522 });

const nameSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy name',
  })
  .openapi({ example: 'some string' });

const addressSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy address',
  })
  .openapi({ example: 'some string' });

const petsFeeIntervalSchema = z
  .string({
    invalid_type_error:
      'query cursor must be a string for orderBy petsFeeInterval',
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

const smokingSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy smoking',
  })
  .openapi({ example: 1 });

const catsSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy cats',
  })
  .openapi({ example: 1 });

const dogsSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy dogs',
  })
  .openapi({ example: 1 });

const petsNegotiableSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error:
      'query cursor must be 0 or 1 for orderBy petsNegotiable',
  })
  .openapi({ example: 1 });

const publishedSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error: 'query cursor must be 0 or 1 for orderBy published',
  })
  .openapi({ example: 1 });

const paidSearchRankingSchema = z
  .nativeEnum(tinyIntValues, {
    invalid_type_error:
      'query cursor must be 0 or 1 for orderBy paidSearchRanking',
  })
  .openapi({ example: 1 });

export const getPropertyCursorValidatorByOrderBy = (orderBy: string) => {
  switch (orderBy) {
    case 'id-asc':
    case 'id-desc':
      return idSchema;

    case 'typeId-asc':
    case 'typeId-desc':
      return typeIdSchema;

    case 'communityId-asc':
    case 'communityId-desc':
      return communityIdSchema;

    case 'cityId-asc':
    case 'cityId-desc':
      return cityIdSchema;

    case 'listingId-asc':
    case 'listingId-desc':
      return listingIdSchema;

    case 'yearBuilt-asc':
    case 'yearBuilt-desc':
      return yearBuiltSchema;

    case 'petsFee-asc':
    case 'petsFee-desc':
      return petsFeeSchema;

    case 'customerRanking-asc':
    case 'customerRanking-desc':
      return customerRankingSchema;

    case 'latitude-asc':
    case 'latitude-desc':
      return latitudeSchema;

    case 'longitude-asc':
    case 'longitude-desc':
      return longitudeSchema;

    case 'name-asc':
    case 'name-desc':
      return nameSchema;

    case 'address-asc':
    case 'address-desc':
      return addressSchema;

    case 'petsFeeInterval-asc':
    case 'petsFeeInterval-desc':
      return petsFeeIntervalSchema;

    case 'createdAt-asc':
    case 'createdAt-desc':
      return createdAtSchema;

    case 'updatedAt-asc':
    case 'updatedAt-desc':
      return updatedAtSchema;

    case 'smoking-asc':
    case 'smoking-desc':
      return smokingSchema;

    case 'cats-asc':
    case 'cats-desc':
      return catsSchema;

    case 'dogs-asc':
    case 'dogs-desc':
      return dogsSchema;

    case 'petsNegotiable-asc':
    case 'petsNegotiable-desc':
      return petsNegotiableSchema;

    case 'published-asc':
    case 'published-desc':
      return publishedSchema;

    case 'paidSearchRanking-asc':
    case 'paidSearchRanking-desc':
      return paidSearchRankingSchema;

    default:
      return z.never();
  }
};

export const paginationPropertyOrderSchema = z.object({
  limit: limitSchema,
  orderBy: z
    .enum([
      'id-asc',
      'id-desc',
      'typeId-asc',
      'typeId-desc',
      'communityId-asc',
      'communityId-desc',
      'cityId-asc',
      'cityId-desc',
      'listingId-asc',
      'listingId-desc',
      'yearBuilt-asc',
      'yearBuilt-desc',
      'petsFee-asc',
      'petsFee-desc',
      'customerRanking-asc',
      'customerRanking-desc',
      'latitude-asc',
      'latitude-desc',
      'longitude-asc',
      'longitude-desc',
      'name-asc',
      'name-desc',
      'address-asc',
      'address-desc',
      'petsFeeInterval-asc',
      'petsFeeInterval-desc',
      'createdAt-asc',
      'createdAt-desc',
      'updatedAt-asc',
      'updatedAt-desc',
      'smoking-asc',
      'smoking-desc',
      'cats-asc',
      'cats-desc',
      'dogs-asc',
      'dogs-desc',
      'petsNegotiable-asc',
      'petsNegotiable-desc',
      'published-asc',
      'published-desc',
      'paidSearchRanking-asc',
      'paidSearchRanking-desc',
    ])
    .optional(),
  cursor: z
    .union([
      idSchema,
      typeIdSchema,
      communityIdSchema,
      cityIdSchema,
      listingIdSchema,
      yearBuiltSchema,
      petsFeeSchema,
      customerRankingSchema,
      latitudeSchema,
      longitudeSchema,
      nameSchema,
      addressSchema,
      petsFeeIntervalSchema,
      createdAtSchema,
      updatedAtSchema,
      smokingSchema,
      catsSchema,
      dogsSchema,
      petsNegotiableSchema,
      publishedSchema,
      paidSearchRankingSchema,
    ])
    .optional(),
});

const textFields = [
  'id',
  'typeId',
  'communityId',
  'cityId',
  'name',
  'address',
  'petsFeeInterval',
] as const;

const numericFields = [
  'listingId',
  'yearBuilt',
  'petsFee',
  'customerRanking',
] as const;

const dateFields = ['createdAt', 'updatedAt'] as const;

const eqTextSchema = z.tuple([z.enum(['eq']), z.enum(textFields), z.string()]);

const tinyIntFields = [
  'smoking',
  'cats',
  'dogs',
  'petsNegotiable',
  'published',
  'paidSearchRanking',
] as const;

const eqTinyIntSchema = z.tuple([
  z.enum(['eq']),
  z.enum(tinyIntFields),
  z.nativeEnum(tinyIntValues),
]);

const decimalFields = ['latitude', 'longitude'] as const;

const decimalSchemaSingle = z.tuple([
  z.enum(['eq', 'lt', 'gt']),
  z.enum(decimalFields),
  z.number(),
]);

const decimalSchemaBetween = z.tuple([
  z.enum(['between']),
  z.enum(decimalFields),
  z.number(),
  z.number(),
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
      decimalSchemaSingle,
      decimalSchemaBetween,
    ]),
  ),
]);

const propertyListSchema = z.array(
  z.union([
    eqTextSchema,
    dateSchemaSingle,
    dateSchemaBetween,
    numericSchemaSingle,
    numericSchemaBetween,
    eqTinyIntSchema,
    decimalSchemaSingle,
    decimalSchemaBetween,
    orSchema,
  ]),
);

export const bodyPropertyListSchema = z.object({
  and: propertyListSchema.optional(),
});

export type PropertyListSchema = z.infer<typeof propertyListSchema>;
