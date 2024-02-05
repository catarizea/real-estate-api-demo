import { createRoute, z } from '@hono/zod-openapi';

import { FeatureToItemSuccessSchema, NomenclatureTag } from '@/types';
import { errorSchema } from '@/validators';

const getFeaturesByItem = (
  tag: NomenclatureTag,
  successSchema: FeatureToItemSuccessSchema,
) =>
  createRoute({
    method: 'get',
    path: '/features-by-item/{itemId}',
    tags: [tag],
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
              data: successSchema,
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

export default getFeaturesByItem;
