import { createRoute, z } from '@hono/zod-openapi';

import { NomenclatureTag } from '@/types';
import { errorSchema } from '@/validators';

const successSchema = z.object({
  message: z.string(),
});

export type SuccessSchema = z.infer<typeof successSchema>;

const getHome = createRoute({
  method: 'get',
  path: '/',
  tags: [NomenclatureTag.Home],
  security: [
    {
      Bearer: [],
    },
  ],
  responses: {
    200: {
      description: 'Responds with a message',
      content: {
        'application/json': {
          schema: successSchema,
        },
      },
    },
    401: {
      description: 'Responds with an unauthorized error message.',
      content: {
        'application/json': {
          schema: errorSchema,
        },
      },
    },
    429: {
      description: 'Responds with a too many requests error message.',
      content: {
        'application/json': {
          schema: errorSchema,
        },
      },
    },
  },
});

export default getHome;
