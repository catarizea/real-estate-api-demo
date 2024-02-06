import { createRoute, z } from '@hono/zod-openapi';

import { selectParkingSchema } from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import {
  bodyParkingListSchema,
  errorSchema,
  paginationParkingOrderSchema,
} from '@/validators';

export const successSchema = z.object({
  success: z.literal(true),
  data: z.array(selectParkingSchema),
});

const postListParking = createRoute({
  method: 'post',
  path: '/list',
  tags: [NomenclatureTag.Parking],
  request: {
    query: paginationParkingOrderSchema,
    body: {
      description: `<p>List parking body property "and" is for filtering items. "eq" operator cand be used with integer fields 'order', 'fee' and for string fields 'id', 'propertyId', 'name', 'feeInterval'.</p><p>"lt", "gt", "between" operators are allowed for integer fields 'order', 'fee' and for date fields 'createdAt' and 'updatedAt'. These operations can also be used inside of "or" operator array. </p><p>Set empty body as {} if you do not want to use any filters.</p>`,
      content: {
        'application/json': {
          schema: bodyParkingListSchema,
          example: {
            and: [
              [
                'or',
                [
                  ['eq', 'name', 'Outdoor'],
                  ['eq', 'name', 'Covered'],
                ],
              ],
              ['eq', 'order', 1],
              ['eq', 'fee', 100],
              ['eq', 'feeInterval', 'monthly'],
              ['lt', 'createdAt', '2024-01-01T00:00:00.000Z'],
              ['gt', 'updatedAt', '2024-01-01T00:00:00.000Z'],
              [
                'between',
                'createdAt',
                '2024-01-01T00:00:00.000Z',
                '2024-01-02T00:00:00.000Z',
              ],
            ],
          },
        },
      },
      required: false,
    },
  },
  responses: {
    200: {
      description: `Responds with an array of parking objects. If no filters are used, all items are returned. If nothing is found according to filters, an empty array is returned as "data".`,
      content: {
        'application/json': {
          schema: successSchema,
        },
      },
    },
    400: {
      description: 'Responds with an error object',
      content: {
        'application/json': {
          schema: errorSchema,
        },
      },
    },
  },
});

export default postListParking;
