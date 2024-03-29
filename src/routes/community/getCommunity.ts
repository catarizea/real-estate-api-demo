import { createRoute, z } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import { NomenclatureTag } from '@/types';
import { errorSchema, preparedCommunitySchema } from '@/validators';

const getCommunity = createRoute({
  method: 'get',
  path: '/{id}',
  tags: [NomenclatureTag.Community],
  security: [
    {
      Bearer: [],
    },
  ],
  request: {
    params: z.object({
      id: z.string().openapi({ example: postmanIds.community }),
    }),
  },
  responses: {
    200: {
      description: 'Responds with a success message.',
      content: {
        'application/json': {
          schema: z.object({
            success: z.literal(true),
            data: preparedCommunitySchema,
          }),
        },
      },
    },
    400: {
      description: 'Responds with a bad request error message.',
      content: {
        'application/json': {
          schema: errorSchema,
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

export default getCommunity;
