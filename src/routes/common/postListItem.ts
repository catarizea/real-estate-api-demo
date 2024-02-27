import { createRoute, z } from '@hono/zod-openapi';

import {
  CommonBodyItemListSchema,
  CommonBodyItemListSchemaExample,
  CommonPaginationOrderSchema,
  CommonSelectItemSchema,
  NomenclatureTag,
} from '@/types';
import { errorSchema } from '@/validators';

const postListItem = ({
  tag,
  selectItemSchema,
  paginationItemOrderSchema,
  bodyItemListSchema,
  bodyItemListSchemaExample,
  bodyDescription,
}: {
  tag: NomenclatureTag;
  selectItemSchema: CommonSelectItemSchema;
  paginationItemOrderSchema: CommonPaginationOrderSchema;
  bodyItemListSchema: CommonBodyItemListSchema;
  bodyItemListSchemaExample: CommonBodyItemListSchemaExample;
  bodyDescription: string;
}) =>
  createRoute({
    method: 'post',
    path: '/list',
    tags: [tag],
    security: [
      {
        Bearer: [],
      },
    ],
    request: {
      query: paginationItemOrderSchema,
      body: {
        description: bodyDescription,
        content: {
          'application/json': {
            schema: bodyItemListSchema,
            example: bodyItemListSchemaExample,
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
            schema: z.object({
              success: z.literal(true),
              data: z.array(selectItemSchema),
            }),
          },
        },
      },
      400: {
        description: 'Responds with a bad request error object',
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

export default postListItem;
