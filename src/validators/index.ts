import { z } from '@hono/zod-openapi';

import type { BathroomListSchema } from './bathroom';
import { bodyBathroomListSchema } from './bathroom';
import type { FieldsSchema, SearchSchema } from './search';
import { bodySearchSchema, searchPropertyUnitSchema } from './search';

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

export {
  BathroomListSchema,
  bodyBathroomListSchema,
  bodySearchSchema,
  FieldsSchema,
  searchPropertyUnitSchema,
  SearchSchema,
};
