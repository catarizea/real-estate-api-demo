import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const getHome = new OpenAPIHono();

const successSchema = z.object({
  message: z.string(),
});

export type SuccessSchema = z.infer<typeof successSchema>;

getHome.openapi(
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

export default getHome;
