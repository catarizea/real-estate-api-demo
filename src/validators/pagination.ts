import { z } from '@hono/zod-openapi';

import { defaultPerPage, maxPerPage } from '@/constants';

export const limitSchema = z.coerce
  .number({ invalid_type_error: 'query limit must be a number' })
  .positive({ message: 'query limit must be geater then zero' })
  .int({ message: 'query limit must be an integer' })
  .max(maxPerPage, {
    message: `query limit must be less then or equal to ${maxPerPage}`,
  })
  .optional()
  .openapi({ example: defaultPerPage });

export const idOptionalSchema = z
  .string({ invalid_type_error: 'query cursor must be an Id string' })
  .optional()
  .openapi({ example: 'abqdj6xe8puto1j83soz3bml' });

export const paginationSchema = z.object({
  limit: limitSchema,
  cursor: idOptionalSchema,
});
