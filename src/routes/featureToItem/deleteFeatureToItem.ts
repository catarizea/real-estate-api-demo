import { createRoute, z } from '@hono/zod-openapi';

import { NomenclatureTag } from '@/types';
import { errorSchema } from '@/validators';

export const successSchema = z.object({
  success: z.literal(true),
});

const deleteFeatureToItem = (tag: NomenclatureTag) =>
  createRoute({
    method: 'delete',
    path: '/delete/{featureId}/{itemId}',
    tags: [tag],
    request: {
      params: z.object({
        featureId: z.string(),
        itemId: z.string(),
      }),
    },
    responses: {
      200: {
        description: 'Responds with a success message.',
        content: {
          'application/json': {
            schema: successSchema,
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

export default deleteFeatureToItem;
