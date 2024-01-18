import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { property } from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { zodSchemas } from '@/models';

const properties = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

export const querySchema = z.object({
  limit: z.coerce
    .number({ invalid_type_error: 'query limit must be a number' })
    .positive({ message: 'query limit must be geater then zero' })
    .int({ message: 'query limit must be an integer' })
    .optional()
    .openapi({ example: 10 }),
  cursor: z
    .string({ invalid_type_error: 'query cursor must be a string' })
    .datetime({ message: 'query cursor must be a valid ISO 8601 date' })
    .optional()
    .openapi({ example: '2024-01-01T00:00:00.000Z' }),
});

export const successSchema = z.object({
  success: z.string(),
  data: z.array(zodSchemas.selectPropertySchema),
});

export type SuccessSchema = z.infer<typeof successSchema>;

properties.openapi(
  createRoute({
    method: 'get',
    path: '/',
    request: {
      query: querySchema,
    },
    responses: {
      200: {
        description: 'Responds with a message',
        content: {
          'application/json': {
            schema: successSchema,
          },
        },
      },
    },
  }),
  async (c) => property.getAllProperties(c),
);

export default properties;
