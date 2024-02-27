import { createRoute, z } from '@hono/zod-openapi';

import { NomenclatureTag } from '@/types';
import { errorSchema, featureToItemSchema } from '@/validators';

export const successSchema = z.object({
  success: z.literal(true),
});

const postCreateFeatureToItem = (
  tag: NomenclatureTag,
  example: { featureId: string; itemId: string },
) =>
  createRoute({
    method: 'post',
    path: '/create',
    tags: [tag],
    security: [
      {
        Bearer: [],
      },
    ],
    request: {
      body: {
        description: `<p>Insert a ${tag} object.</p>`,
        content: {
          'application/json': {
            schema: featureToItemSchema,
            example,
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
        description: 'Responds with a bad request error message.',
        content: {
          'application/json': {
            schema: errorSchema,
          },
        },
      },
    },
  });

export default postCreateFeatureToItem;
