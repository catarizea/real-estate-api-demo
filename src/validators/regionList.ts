import { z } from '@hono/zod-openapi';

import { limitSchema } from './pagination';

const idSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy id',
  })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const nameSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy name',
  })
  .openapi({ example: 'some string' });

const administrativeNameSchema = z
  .string({
    invalid_type_error:
      'query cursor must be a string for orderBy administrativeName',
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

export const getRegionCursorValidatorByOrderBy = (orderBy: string) => {
  switch (orderBy) {
    case 'id-asc':
    case 'id-desc':
      return idSchema;

    case 'name-asc':
    case 'name-desc':
      return nameSchema;

    case 'administrativeName-asc':
    case 'administrativeName-desc':
      return administrativeNameSchema;

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

export const paginationRegionOrderSchema = z.object({
  limit: limitSchema,
  orderBy: z
    .enum([
      'id-asc',
      'id-desc',
      'name-asc',
      'name-desc',
      'administrativeName-asc',
      'administrativeName-desc',
      'createdAt-asc',
      'createdAt-desc',
      'updatedAt-asc',
      'updatedAt-desc',
    ])
    .optional(),
  cursor: z
    .union([
      idSchema,
      nameSchema,
      administrativeNameSchema,
      createdAtSchema,
      updatedAtSchema,
    ])
    .optional(),
});

const textFields = ['id', 'name', 'administrativeName'] as const;

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

const orSchema = z.tuple([
  z.enum(['or']),
  z.array(z.union([eqTextSchema, dateSchemaSingle, dateSchemaBetween])),
]);

const regionListSchema = z.array(
  z.union([eqTextSchema, dateSchemaSingle, dateSchemaBetween, orSchema]),
);

export const bodyRegionListSchema = z.object({
  and: regionListSchema.optional(),
});

export type RegionListSchema = z.infer<typeof regionListSchema>;
