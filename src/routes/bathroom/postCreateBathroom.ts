import { createRoute, z } from '@hono/zod-openapi';

import { insertBathroomSchema } from '@/models/zodSchemas';
import { errorSchema } from '@/validators';

export const successSchema = z.object({
  success: z.literal(true),
  data: z.object({ id: z.string() }),
});

const postCreateBathroom = createRoute({
  method: 'post',
  path: '/create',
  tags: ['bathroom'],
  request: {
    body: {
      description: `<p>Insert a bathroom object.</p>`,
      content: {
        'application/json': {
          schema: insertBathroomSchema,
          example: {
            name: '1.5',
            order: 1,
          },
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Responds with the id of the created bathroom.',
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

export default postCreateBathroom;
