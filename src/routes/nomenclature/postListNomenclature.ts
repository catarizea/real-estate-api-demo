import { createRoute, z } from '@hono/zod-openapi';

import { selectBathroomSchema } from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import {
  bodyBathroomListSchema,
  errorSchema,
  paginationOrderSchema,
} from '@/validators';

export const successSchema = z.object({
  success: z.literal(true),
  data: z.array(selectBathroomSchema),
});

const postListNomenclature = (tag: NomenclatureTag) =>
  createRoute({
    method: 'post',
    path: '/list',
    tags: [tag],
    request: {
      query: paginationOrderSchema,
      body: {
        description: `<p>List ${tag} body property "and" is for filtering items. "eq" operator cand be used with integer fields ('order'). "eq" operator can also be used with string fields ('id', 'name').</p><p>"lt", "gt", "between" operators are allowed for 'createdAt' and 'updatedAt' fields. The two "eq" use cases and those with date can also be used inside of "or" operator array. </p><p>Set empty body as {} if you do not want to use any filters.</p>`,
        content: {
          'application/json': {
            schema: bodyBathroomListSchema,
            example: {
              and: [
                [
                  'or',
                  [
                    ['eq', 'name', '3+'],
                    ['eq', 'name', '2.5'],
                  ],
                ],
                ['eq', 'order', 1],
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
        description: `Responds with an array of ${tag} objects. If no filters are used, all items are returned. If nothing is found according to filters, an empty array is returned as "data".`,
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

export default postListNomenclature;
