import { swaggerUI } from '@hono/swagger-ui';
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const app = new OpenAPIHono();

app.openapi(
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

app.get(
  '/ui',
  swaggerUI({
    url: '/doc',
  }),
);

app.doc('/doc', {
  info: {
    title: 'Real Estate API Demo',
    version: 'v1',
  },
  openapi: '3.1.0',
});

export default app;
