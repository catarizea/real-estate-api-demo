import { z } from '@hono/zod-openapi';

import { limitSchema } from './pagination';

const idSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy id',
  })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const regionIdSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy regionId',
  })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

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

export const getCityCursorValidatorByOrderBy = (orderBy: string) => {
  switch (orderBy) {
    case 'id-asc':
    case 'id-desc':
      return idSchema;

    case 'regionId-asc':
    case 'regionId-desc':
      return regionIdSchema;

    case 'latitude-asc':
    case 'latitude-desc':
      return latitudeSchema;

    case 'longitude-asc':
    case 'longitude-desc':
      return longitudeSchema;

    case 'name-asc':
    case 'name-desc':
      return nameSchema;

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

export const paginationCityOrderSchema = z.object({
  limit: limitSchema,
  orderBy: z
    .enum([
      'id-asc',
      'id-desc',
      'regionId-asc',
      'regionId-desc',
      'latitude-asc',
      'latitude-desc',
      'longitude-asc',
      'longitude-desc',
      'name-asc',
      'name-desc',
      'createdAt-asc',
      'createdAt-desc',
      'updatedAt-asc',
      'updatedAt-desc',
    ])
    .optional(),
  cursor: z
    .union([
      idSchema,
      regionIdSchema,
      latitudeSchema,
      longitudeSchema,
      nameSchema,
      createdAtSchema,
      updatedAtSchema,
    ])
    .optional(),
});

const textFields = ['id', 'regionId', 'name'] as const;

const eqTextSchema = z.tuple([z.enum(['eq']), z.enum(textFields), z.string()]);

const dateFields = ['createdAt', 'updatedAt'] as const;

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

const orSchema = z.tuple([
  z.enum(['or']),
  z.array(
    z.union([
      eqTextSchema,
      dateSchemaSingle,
      dateSchemaBetween,
      decimalSchemaSingle,
      decimalSchemaBetween,
    ]),
  ),
]);

const cityListSchema = z.array(
  z.union([
    eqTextSchema,
    dateSchemaSingle,
    dateSchemaBetween,
    decimalSchemaSingle,
    decimalSchemaBetween,
    orSchema,
  ]),
);

export const bodyCityListSchema = z.object({
  and: cityListSchema.optional(),
});

export type CityListSchema = z.infer<typeof cityListSchema>;
