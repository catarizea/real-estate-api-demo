import { createRoute, z } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import { NomenclatureTag } from '@/types';
import { errorSchema, preparedPropertySchema } from '@/validators';

const getProperty = createRoute({
  method: 'get',
  path: '/{id}',
  tags: [NomenclatureTag.Property],
  security: [
    {
      Bearer: [],
    },
  ],
  request: {
    params: z.object({
      id: z.string().openapi({ example: postmanIds.property }),
    }),
  },
  responses: {
    200: {
      description: 'Responds with a success message.',
      content: {
        'application/json': {
          schema: z.object({
            success: z.literal(true),
            data: preparedPropertySchema,
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
      description: 'Responds with an unauthorized message.',
      content: {
        'application/json': {
          schema: errorSchema,
        },
      },
    },
  },
});

export default getProperty;
