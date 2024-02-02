import { createRoute, z } from '@hono/zod-openapi';

import { errorSchema } from '@/validators';

export const successSchema = z.object({
  success: z.literal(true),
});

const deleteBathroom = createRoute({
  method: 'delete',
  path: '/delete/{id}',
  tags: ['bathroom'],
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: 'Responds with a success message.',
      content: {
        'application/json': {
          schema: successSchema,
        },
      },
    },
    400: {
      description: 'Responds with an error message.',
      content: {
        'application/json': {
          schema: errorSchema,
        },
      },
    },
  },
});

export default deleteBathroom;
