import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { getAllProperties } from '@/controllers';
import { schema } from '@/models';

const properties = new OpenAPIHono();

const successSchema = z.object({
  success: z.string(),
  data: z.array(schema.selectPropertySchema),
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
  async (c) => getAllProperties(c),
);

export default properties;
