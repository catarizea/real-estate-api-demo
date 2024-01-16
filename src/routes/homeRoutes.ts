import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const home = new OpenAPIHono();

home.openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        description: 'Responds with a message',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
    },
  }),
  (c) => {
    return c.json({
      message: 'real estate api demo',
    });
  },
);

export default home;
