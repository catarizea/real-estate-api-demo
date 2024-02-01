import { z } from '@hono/zod-openapi';

import { defaultPerPage, maxPerPage } from '@/constants';

const limitSchema = z.coerce
  .number({ invalid_type_error: 'query limit must be a number' })
  .positive({ message: 'query limit must be geater then zero' })
  .int({ message: 'query limit must be an integer' })
  .max(maxPerPage, {
    message: `query limit must be less then or equal to ${maxPerPage}`,
  })
  .optional()
  .openapi({ example: defaultPerPage });

const idOptionalSchema = z
  .string({ invalid_type_error: 'query cursor must be an Id string' })
  .optional()
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const idSchema = z
  .string({ invalid_type_error: 'query cursor must be an Id string' })
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

const orderSchema = z.coerce
  .number({
    invalid_type_error: `query cursor must be a number for orderBy order`,
  })
  .int({ message: `query cursor must be an integer for orderBy order` })
  .openapi({ example: 1 });

const nameSchema = z.coerce
  .string({
    invalid_type_error: `query cursor must be a number for orderBy name`,
  })
  .openapi({ example: 'something' });

const datetimeSchema = z
  .string({
    invalid_type_error: `query cursor must be a date time string for orderBy createdAt or updatedAt`,
  })
  .datetime({
    message: `query cursor must be a valid ISO 8601 date for orderBy createdAt or updatedAt`,
  })
  .openapi({ example: '2024-01-01T00:00:00.000Z' });

export const getCursorValidatorByOrderBy = (orderBy: string) => {
  switch (orderBy) {
    case 'id-asc':
    case 'id-desc':
      return idSchema;
    case 'order-asc':
    case 'order-desc':
      return orderSchema;
    case 'name-asc':
    case 'name-desc':
      return nameSchema;
    case 'createdAt-asc':
    case 'createdAt-desc':
    case 'updatedAt-asc':
    case 'updatedAt-desc':
      return datetimeSchema;
    default:
      return z.never();
  }
};

export const paginationOrderSchema = z.object({
  limit: limitSchema,
  orderBy: z
    .enum([
      'id-asc',
      'order-asc',
      'name-asc',
      'createdAt-asc',
      'updatedAt-asc',
      'id-desc',
      'order-desc',
      'name-desc',
      'createdAt-desc',
      'updatedAt-desc',
    ])
    .optional(),
  cursor: z
    .union([idSchema, orderSchema, nameSchema, datetimeSchema])
    .optional(),
});

export const paginationSchema = z.object({
  limit: limitSchema,
  cursor: idOptionalSchema,
});
