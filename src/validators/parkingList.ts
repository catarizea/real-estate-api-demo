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

const feeSchema = z.coerce
  .number({
    invalid_type_error: 'query cursor must be a number for orderBy fee',
  })
  .int({ message: 'query cursor must be an integer for orderBy fee' })
  .openapi({ example: 1 });

const nameSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy name',
  })
  .openapi({ example: 'some string' });

const feeIntervalSchema = z
  .string({
    invalid_type_error: 'query cursor must be a string for orderBy feeInterval',
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

export const getParkingCursorValidatorByOrderBy = (orderBy: string) => {
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

    case 'fee-asc':
    case 'fee-desc':
      return feeSchema;

    case 'name-asc':
    case 'name-desc':
      return nameSchema;

    case 'feeInterval-asc':
    case 'feeInterval-desc':
      return feeIntervalSchema;

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

export const paginationParkingOrderSchema = z.object({
  limit: limitSchema,
  orderBy: z
    .enum([
      'id-asc',
      'id-desc',
      'propertyId-asc',
      'propertyId-desc',
      'order-asc',
      'order-desc',
      'fee-asc',
      'fee-desc',
      'name-asc',
      'name-desc',
      'feeInterval-asc',
      'feeInterval-desc',
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
      feeSchema,
      nameSchema,
      feeIntervalSchema,
      createdAtSchema,
      updatedAtSchema,
    ])
    .optional(),
});

const textFields = ['id', 'propertyId', 'name', 'feeInterval'] as const;

const numericFields = ['order', 'fee'] as const;

const dateFields = ['createdAt', 'updatedAt'] as const;

const eqTextSchema = z.tuple([z.enum(['eq']), z.enum(textFields), z.string()]);

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
    ]),
  ),
]);

const parkingListSchema = z.array(
  z.union([
    eqTextSchema,
    dateSchemaSingle,
    dateSchemaBetween,
    numericSchemaSingle,
    numericSchemaBetween,
    orSchema,
  ]),
);

export const bodyParkingListSchema = z.object({
  and: parkingListSchema.optional(),
});

export type ParkingListSchema = z.infer<typeof parkingListSchema>;
