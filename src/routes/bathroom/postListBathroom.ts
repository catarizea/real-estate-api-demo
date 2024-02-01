import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { postListBathroomHandler } from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import { selectBathroomSchema } from '@/models/zodSchemas';
import {
  bodyBathroomListSchema,
  errorSchema,
  paginationSchema,
} from '@/validators';

const postListBathroom = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

export const successSchema = z.object({
  success: z.literal(true),
  data: z.array(selectBathroomSchema),
});

postListBathroom.openapi(
  createRoute({
    method: 'post',
    path: '/',
    request: {
      query: paginationSchema,
      body: {
        description: `List bathrooms body property "and" is for filtering bathrooms. "eq" operator cand be used with integer fields ('order'). "eq" operator can also be used with string fields ('id', 'name'). Only these two "eq" use cases can be used inside of "or" operator array. Set empty body as {} if you do not want to use any filters.`,
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
              ],
            },
          },
        },
        required: false,
      },
    },
    responses: {
      200: {
        description:
          'Responds with an array of bathroom objects. If no filters are used, all bathrooms are returned. If nothing is found according to filters, an empty array is returned as "data".',
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
  }),
  async (c) => await postListBathroomHandler(c),
);

export default postListBathroom;
