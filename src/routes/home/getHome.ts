import { createRoute, z } from '@hono/zod-openapi';

const successSchema = z.object({
  message: z.string(),
});

export type SuccessSchema = z.infer<typeof successSchema>;

const getHome = createRoute({
  method: 'get',
  path: '/',
  tags: ['home'],
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
});

export default getHome;