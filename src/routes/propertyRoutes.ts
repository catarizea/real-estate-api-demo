import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { property } from '@/controllers';
import { zodSchemas } from '@/models';

const properties = new OpenAPIHono();

const successSchema = z.object({
  success: z.string(),
  data: z.array(zodSchemas.selectPropertySchema),
});

properties.openapi(
  createRoute({
    method: 'get',
    path: '/',
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
