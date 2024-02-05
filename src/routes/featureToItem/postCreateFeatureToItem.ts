import { createRoute, z } from '@hono/zod-openapi';

import { NomenclatureTag } from '@/types';
import { errorSchema, featureToItemSchema } from '@/validators';

export const successSchema = z.object({
  success: z.literal(true),
});

const postCreateFeatureToItem = (tag: NomenclatureTag) =>
  createRoute({
    method: 'post',
    path: '/create',
    tags: [tag],
    request: {
      body: {
        description: `<p>Insert a ${tag} object.</p>`,
        content: {
          'application/json': {
            schema: featureToItemSchema,
            example: {
              featureId: 'kse7hpwwu3rj6ook4g90nvzs',
              itemId: 'a5ug1fdwkkc4byl1uw9d7cqo',
            },
          },
        },
        required: true,
      },
    },
    responses: {
      201: {
        description: `Responds with a success message.`,
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

export default postCreateFeatureToItem;
