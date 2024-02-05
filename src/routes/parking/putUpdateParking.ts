import { createRoute, z } from '@hono/zod-openapi';

import { updateParkingSchema } from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { errorSchema } from '@/validators';

export const successSchema = z.object({
  success: z.literal(true),
  data: z.object({ id: z.string() }),
});

const putUpdateParking = createRoute({
  method: 'put',
  path: '/update/{id}',
  tags: [NomenclatureTag.Parking],
  request: {
    params: z.object({
      id: z.string(),
    }),
    body: {
      description: `<p>Update a parking object.</p>`,
      content: {
        'application/json': {
          schema: updateParkingSchema,
          example: {
            name: 'Covered',
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
    200: {
      description: `Responds with the id of the updated parking.`,
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

export default putUpdateParking;
