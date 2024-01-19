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
  success: z.literal(true),
  data: z.array(zodSchemas.selectPropertySchema),
});

export const errorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    reason: z.string(),
    issues: z
      .array(z.object({ message: z.string(), path: z.array(z.string()) }))
      .optional(),
  }),
});

export type SuccessSchema = z.infer<typeof successSchema>;
export type ErrorSchema = z.infer<typeof errorSchema>;

properties.openapi(
  createRoute({
    method: 'get',
    path: '/',
    request: {
      query: querySchema,
    },
    responses: {
      200: {
        description: 'Responds with an array of property objects',
        content: {
          'application/json': {
            schema: successSchema,
          },
        },
      },
      400: {
        description: 'Responds with an error object',
        content: {
          'application/json': {
            schema: errorSchema,
          },
        },
      },
    },
  }),
  async (c) => property.getAllProperties(c),
);

export default properties;
