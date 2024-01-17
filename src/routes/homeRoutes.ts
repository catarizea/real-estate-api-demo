import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const home = new OpenAPIHono();

const successSchema = z.object({
  message: z.string(),
});

export type SuccessSchema = z.infer<typeof successSchema>;

home.openapi(
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
  (c) => {
    return c.json({
      message: 'real estate api demo',
    });
  },
);

export default home;
