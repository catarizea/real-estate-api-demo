import { createRoute, z } from '@hono/zod-openapi';

import { FeatureToItemSuccessSchema, NomenclatureTag } from '@/types';
import { errorSchema } from '@/validators';

const getFeaturesByItem = (
  tag: NomenclatureTag,
  successSchema: FeatureToItemSuccessSchema,
  postmanId: string,
) =>
  createRoute({
    method: 'get',
    path: '/features-by-item/{itemId}',
    tags: [tag],
    request: {
      params: z.object({
        itemId: z.string().openapi({ example: postmanId }),
      }),
    },
    responses: {
      200: {
        description: 'Responds with a success message.',
        content: {
          'application/json': {
            schema: z.object({
              success: z.literal(true),
              data: successSchema,
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
    },
  });

export default getFeaturesByItem;
