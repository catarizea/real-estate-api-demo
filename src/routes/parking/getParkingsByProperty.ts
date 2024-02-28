import { createRoute, z } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';
import { NomenclatureTag } from '@/types';
import { errorSchema } from '@/validators';
import { parkingsByPropertySuccessSchema } from '@/validators';

const getParkingsByProperty = createRoute({
  method: 'get',
  path: '/parkings-by-property/{itemId}',
  tags: [NomenclatureTag.Parking],
  security: [
    {
      Bearer: [],
    },
  ],
  request: {
    params: z.object({
      itemId: z.string().openapi({ example: postmanIds.property }),
    }),
  },
  responses: {
    200: {
      description: 'Responds with a success message.',
      content: {
        'application/json': {
          schema: z.object({
            success: z.literal(true),
            data: parkingsByPropertySuccessSchema,
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

export default getParkingsByProperty;
