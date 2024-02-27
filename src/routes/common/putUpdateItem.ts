import { createRoute, z } from '@hono/zod-openapi';

import {
  CommonUpdateSchema,
  CommonUpdateSchemaExample,
  NomenclatureTag,
} from '@/types';
import { errorSchema } from '@/validators';

export const successSchema = z.object({
  success: z.literal(true),
  data: z.object({ id: z.string() }),
});

const putUpdateItem = ({
  tag,
  updateItemSchema,
  updateItemSchemaExample,
  postmanId,
}: {
  tag: NomenclatureTag;
  updateItemSchema: CommonUpdateSchema;
  updateItemSchemaExample: CommonUpdateSchemaExample;
  postmanId: string;
}) =>
  createRoute({
    method: 'put',
    path: '/update/{id}',
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
      body: {
        description: `<p>Update a ${tag} object.</p>`,
        content: {
          'application/json': {
            schema: updateItemSchema,
            example: updateItemSchemaExample,
          },
        },
        required: true,
      },
    },
    responses: {
      200: {
        description: `Responds with the id of the updated ${tag}.`,
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
        description: 'Responds with an unauthorized message.',
        content: {
          'application/json': {
            schema: errorSchema,
          },
        },
      },
      403: {
        description: 'Responds with a forbidden message.',
        content: {
          'application/json': {
            schema: errorSchema,
          },
        },
      },
    },
  });

export default putUpdateItem;
