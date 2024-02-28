import { createRoute, z } from '@hono/zod-openapi';

import { NomenclatureTag } from '@/types';
import { errorSchema } from '@/validators';

export const successSchema = z.object({
  success: z.literal(true),
});

const deleteItem = ({
  tag,
  postmanId,
}: {
  tag: NomenclatureTag;
  postmanId: string;
}) =>
  createRoute({
    method: 'delete',
    path: '/delete/{id}',
    tags: [tag],
    security: [
      {
        Bearer: [],
      },
    ],
    request: {
      params: z.object({
        id: z.string().openapi({ example: postmanId }),
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
      401: {
        description: 'Responds with an unauthorized error message.',
        content: {
          'application/json': {
            schema: errorSchema,
          },
        },
      },
      403: {
        description: 'Responds with a forbidden error message.',
        content: {
          'application/json': {
            schema: errorSchema,
          },
        },
      },
      409: {
        description: 'Responds with a conflict error message.',
        content: {
          'application/json': {
            schema: errorSchema,
          },
        },
      },
      429: {
        description: 'Responds with a too many requests error message.',
        content: {
          'application/json': {
            schema: errorSchema,
          },
        },
      },
    },
  });

export default deleteItem;
