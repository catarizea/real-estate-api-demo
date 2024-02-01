import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { postSearchHandler } from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import {
  andSchema,
  errorSchema,
  paginationSchema,
  searchPropertyUnitSchema,
} from '@/validators';

const postSearch = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

export const successSchema = z.object({
  success: z.literal(true),
  data: z.array(searchPropertyUnitSchema),
});

postSearch.openapi(
  createRoute({
    method: 'post',
    path: '/',
    request: {
      query: paginationSchema,
      body: {
        description: `Search object for property units. "eq" operator cand be used with numerical tinyint fields ('immediate', 'shortterm', 'longterm', 'furnished', 'heat', 'water', 'electricity','internet', 'television', 'smoking', 'cats', 'dogs', 'listingId') and string fields ('bedroom', 'bathroom', 'type'). Only these two "eq" use cases can be used inside of "or" operator array. "between" operator can be used only with numerical field 'rent'. "like" operator can be used with string fields ('address', 'community', 'parking', 'feature'). "aroundLatLng" operator can be used with geo fields ('latitude', 'longitude') the third argument being the radius in meters. Set empty body as {} if you do not want to use any filters.`,
        content: {
          'application/json': {
            schema: andSchema,
            example: {
              and: [
                ['eq', 'smoking', 1],
                ['between', 'rent', 1000, 1200],
                ['like', 'address', 'Crescent'],
                [
                  'or',
                  [
                    ['eq', 'cats', 1],
                    ['eq', 'dogs', 1],
                  ],
                ],
                ['aroundLatLng', 50.9573828, -114.084153, 1000],
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
          'Responds with an array of property unit objects. If no filters are used, all property units are returned. If nothing is found according to filters, an empty array is returned.',
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
  async (c) => await postSearchHandler(c),
);

export default postSearch;
