import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

import { postSearchHandler } from '@/controllers';
import { zodDefaultHook } from '@/middlewares';
import {
  bodySearchSchema,
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
        description: `<p>Search body property "and" is for filtering property units. "eq" operator cand be used with numerical tinyint fields ('immediate', 'shortterm', 'longterm', 'furnished', 'heat', 'water', 'electricity','internet', 'television', 'smoking', 'cats', 'dogs', 'listingId') and string fields ('id', 'propertyId', 'bedroom', 'bathroom', 'type', 'community'). Only these two "eq" use cases can be used inside of "or" operator array. "between" operator can be used only with numerical field 'rent'. "like" operator can be used with string fields ('address', 'parking', 'feature'). "aroundLatLng" operator can be used with geo fields ('latitude', 'longitude') the third argument being the radius in meters. Set empty body as {} if you do not want to use any filters.</p><p>Search body property "fields" is for selecting the fields you want to be returned in the response. If you do not use this property, all fields will be returned. If you want to select only some fields, use the following format: "fields": ["propertyId", "rent", "immediate", "availableDate", "shortterm", "longterm", "furnished", "heat", "water", "electricity", "internet", "television", "bedroom", "bathroom", "listingId", "address", "community", "type", "smoking", "cats", "dogs", "parking", "feature", "imageId", "latitude", "longitude"]. 'id' field is always returned for pagination.</p>`,
        content: {
          'application/json': {
            schema: bodySearchSchema,
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
              fields: [
                'listingId',
                'propertyId',
                'rent',
                'immediate',
                'imageId',
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
          'Responds with an array of property unit objects. If no filters are used, all property units are returned. If nothing is found according to filters, an empty array is returned as "data".',
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
