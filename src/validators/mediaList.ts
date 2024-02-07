import { z } from '@hono/zod-openapi';

import { limitSchema } from './pagination';

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

const orderSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy order',
  })
  .int({ message: 'query cursor must be an integer for orderBy order' })
  .openapi({ example: 1 });

const assetIdSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy assetId',
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

export const getMediaCursorValidatorByOrderBy = (orderBy: string) => {
  switch (orderBy) {
    case 'id-asc':
    case 'id-desc':
      return idSchema;

    case 'propertyId-asc':
    case 'propertyId-desc':
      return propertyIdSchema;

    case 'order-asc':
    case 'order-desc':
      return orderSchema;

    case 'assetId-asc':
    case 'assetId-desc':
      return assetIdSchema;

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

export const paginationMediaOrderSchema = z.object({
  limit: limitSchema,
  orderBy: z
    .enum([
      'id-asc',
      'id-desc',
      'propertyId-asc',
      'propertyId-desc',
      'order-asc',
      'order-desc',
      'assetId-asc',
      'assetId-desc',
      'createdAt-asc',
      'createdAt-desc',
      'updatedAt-asc',
      'updatedAt-desc',
    ])
    .optional(),
  cursor: z
    .union([
      idSchema,
      propertyIdSchema,
      orderSchema,
      assetIdSchema,
      createdAtSchema,
      updatedAtSchema,
    ])
    .optional(),
});

const textFields = ['id', 'propertyId', 'assetId'] as const;

const eqTextSchema = z.tuple([z.enum(['eq']), z.enum(textFields), z.string()]);

const numericFields = ['order'] as const;

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
  z.array(
    z.union([
      eqTextSchema,
      dateSchemaSingle,
      dateSchemaBetween,
      numericSchemaSingle,
      numericSchemaBetween,
    ]),
  ),
]);

const mediaListSchema = z.array(
  z.union([
    eqTextSchema,
    dateSchemaSingle,
    dateSchemaBetween,
    numericSchemaSingle,
    numericSchemaBetween,
    orSchema,
  ]),
);

export const bodyMediaListSchema = z.object({
  and: mediaListSchema.optional(),
});

export type MediaListSchema = z.infer<typeof mediaListSchema>;
