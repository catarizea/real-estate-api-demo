import { createRoute, z } from '@hono/zod-openapi';

import { NomenclatureTag } from '@/types';
import { errorSchema } from '@/validators';
import { parkingsByPropertySuccessSchema } from '@/validators';

const getParkingsByProperty = createRoute({
  method: 'get',
  path: '/parkings-by-property/{itemId}',
  tags: [NomenclatureTag.Parking],
  request: {
    params: z.object({
      itemId: z.string(),
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
      description: 'Responds with an error message.',
      content: {
        'application/json': {
          schema: errorSchema,
        },
      },
    },
  },
});

export default getParkingsByProperty;