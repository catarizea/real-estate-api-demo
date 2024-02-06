import { z } from '@hono/zod-openapi';

import { limitSchema } from './pagination';

const idSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy id',
  })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const cityIdSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy cityId',
  })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const scoreSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy score',
  })
  .int({ message: 'query cursor must be an integer for orderBy score' })
  .openapi({ example: 1 });

const populationSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy population',
  })
  .int({ message: 'query cursor must be an integer for orderBy population' })
  .openapi({ example: 1 });

const dwellingsSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy dwellings',
  })
  .int({ message: 'query cursor must be an integer for orderBy dwellings' })
  .openapi({ example: 1 });

const averageIncomeSchema = z.coerce
  .number({
    invalid_type_error:
      'query cursor must be a number for orderBy averageIncome',
  })
  .int({ message: 'query cursor must be an integer for orderBy averageIncome' })
  .openapi({ example: 1 });

const elevationSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy elevation',
  })
  .int({ message: 'query cursor must be an integer for orderBy elevation' })
  .openapi({ example: 1 });

const establishedSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy established',
  })
  .int({ message: 'query cursor must be an integer for orderBy established' })
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

const areaSchema = z.coerce
  .number({
    invalid_type_error:
      'query cursor must be a decimal number for orderBy area',
  })
  .openapi({ example: 50.14522 });

const usedForRentingSchema = z.coerce
  .number({
    invalid_type_error:
      'query cursor must be a decimal number for orderBy usedForRenting',
  })
  .openapi({ example: 50.14522 });

const densitySchema = z.coerce
  .number({
    invalid_type_error:
      'query cursor must be a decimal number for orderBy density',
  })
  .openapi({ example: 50.14522 });

const lowIncomeSchema = z.coerce
  .number({
    invalid_type_error:
      'query cursor must be a decimal number for orderBy lowIncome',
  })
  .openapi({ example: 50.14522 });

const immigrantsSchema = z.coerce
  .number({
    invalid_type_error:
      'query cursor must be a decimal number for orderBy immigrants',
  })
  .openapi({ example: 50.14522 });

const nameSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy name',
  })
  .openapi({ example: 'some string' });

const imageUrlSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy imageUrl',
  })
  .openapi({ example: 'some string' });

const quadrantSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy quadrant',
  })
  .openapi({ example: 'some string' });

const sectorSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy sector',
  })
  .openapi({ example: 'some string' });

const wardSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy ward',
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

export const getCommunityCursorValidatorByOrderBy = (orderBy: string) => {
  switch (orderBy) {
    case 'id-asc':
    case 'id-desc':
      return idSchema;

    case 'cityId-asc':
    case 'cityId-desc':
      return cityIdSchema;

    case 'score-asc':
    case 'score-desc':
      return scoreSchema;

    case 'population-asc':
    case 'population-desc':
      return populationSchema;

    case 'dwellings-asc':
    case 'dwellings-desc':
      return dwellingsSchema;

    case 'averageIncome-asc':
    case 'averageIncome-desc':
      return averageIncomeSchema;

    case 'elevation-asc':
    case 'elevation-desc':
      return elevationSchema;

    case 'established-asc':
    case 'established-desc':
      return establishedSchema;

    case 'latitude-asc':
    case 'latitude-desc':
      return latitudeSchema;

    case 'longitude-asc':
    case 'longitude-desc':
      return longitudeSchema;

    case 'area-asc':
    case 'area-desc':
      return areaSchema;

    case 'usedForRenting-asc':
    case 'usedForRenting-desc':
      return usedForRentingSchema;

    case 'density-asc':
    case 'density-desc':
      return densitySchema;

    case 'lowIncome-asc':
    case 'lowIncome-desc':
      return lowIncomeSchema;

    case 'immigrants-asc':
    case 'immigrants-desc':
      return immigrantsSchema;

    case 'name-asc':
    case 'name-desc':
      return nameSchema;

    case 'imageUrl-asc':
    case 'imageUrl-desc':
      return imageUrlSchema;

    case 'quadrant-asc':
    case 'quadrant-desc':
      return quadrantSchema;

    case 'sector-asc':
    case 'sector-desc':
      return sectorSchema;

    case 'ward-asc':
    case 'ward-desc':
      return wardSchema;

    case 'createdAt-asc':
    case 'createdAt-desc':
      return createdAtSchema;

    case 'updatedAt-asc':
    case 'updatedAt-desc':
      return updatedAtSchema;

    default:
      return z.never();
  }
};

export const paginationCommunityOrderSchema = z.object({
  limit: limitSchema,
  orderBy: z
    .enum([
      'id-asc',
      'id-desc',
      'cityId-asc',
      'cityId-desc',
      'score-asc',
      'score-desc',
      'population-asc',
      'population-desc',
      'dwellings-asc',
      'dwellings-desc',
      'averageIncome-asc',
      'averageIncome-desc',
      'elevation-asc',
      'elevation-desc',
      'established-asc',
      'established-desc',
      'latitude-asc',
      'latitude-desc',
      'longitude-asc',
      'longitude-desc',
      'area-asc',
      'area-desc',
      'usedForRenting-asc',
      'usedForRenting-desc',
      'density-asc',
      'density-desc',
      'lowIncome-asc',
      'lowIncome-desc',
      'immigrants-asc',
      'immigrants-desc',
      'name-asc',
      'name-desc',
      'imageUrl-asc',
      'imageUrl-desc',
      'quadrant-asc',
      'quadrant-desc',
      'sector-asc',
      'sector-desc',
      'ward-asc',
      'ward-desc',
      'createdAt-asc',
      'createdAt-desc',
      'updatedAt-asc',
      'updatedAt-desc',
    ])
    .optional(),
  cursor: z
    .union([
      idSchema,
      cityIdSchema,
      scoreSchema,
      populationSchema,
      dwellingsSchema,
      averageIncomeSchema,
      elevationSchema,
      establishedSchema,
      latitudeSchema,
      longitudeSchema,
      areaSchema,
      usedForRentingSchema,
      densitySchema,
      lowIncomeSchema,
      immigrantsSchema,
      nameSchema,
      imageUrlSchema,
      quadrantSchema,
      sectorSchema,
      wardSchema,
      createdAtSchema,
      updatedAtSchema,
    ])
    .optional(),
});

const textFields = [
  'id',
  'cityId',
  'name',
  'imageUrl',
  'quadrant',
  'sector',
  'ward',
] as const;

const numericFields = [
  'score',
  'population',
  'dwellings',
  'averageIncome',
  'elevation',
  'established',
] as const;

const dateFields = ['createdAt', 'updatedAt'] as const;

const eqTextSchema = z.tuple([z.enum(['eq']), z.enum(textFields), z.string()]);

const decimalFields = [
  'latitude',
  'longitude',
  'area',
  'usedForRenting',
  'density',
  'lowIncome',
  'immigrants',
] as const;

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
      decimalSchemaSingle,
      decimalSchemaBetween,
    ]),
  ),
]);

const communityListSchema = z.array(
  z.union([
    eqTextSchema,
    dateSchemaSingle,
    dateSchemaBetween,
    numericSchemaSingle,
    numericSchemaBetween,
    decimalSchemaSingle,
    decimalSchemaBetween,
    orSchema,
  ]),
);

export const bodyCommunityListSchema = z.object({
  and: communityListSchema.optional(),
});

export type CommunityListSchema = z.infer<typeof communityListSchema>;
