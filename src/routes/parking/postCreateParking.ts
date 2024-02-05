import { createRoute, z } from '@hono/zod-openapi';

import { insertParkingSchema } from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { errorSchema } from '@/validators';

export const successSchema = z.object({
  success: z.literal(true),
  data: z.object({
    id: z.string(),
  }),
});

const postCreateParking = createRoute({
  method: 'post',
  path: '/create',
  tags: [NomenclatureTag.Parking],
  request: {
    body: {
      description: `<p>Insert a parking object.</p>`,
      content: {
        'application/json': {
          schema: insertParkingSchema,
          example: {
            name: 'Covered',
            propertyId: 'a5ug1fdwkkc4byl1uw9d7cqo',
            fee: 100,
            feeInterval: 'monthly',
            order: 1,
          },
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: `Responds with a success message.`,
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

export default postCreateParking;
