import { createRoute, z } from '@hono/zod-openapi';

import {
  CommonInsertSchema,
  CommonInsertSchemaExample,
  NomenclatureTag,
} from '@/types';
import { errorSchema } from '@/validators';

export const successSchema = z.object({
  success: z.literal(true),
  data: z.object({
    id: z.string(),
  }),
});

const postCreateItem = ({
  tag,
  insertItemSchema,
  insertItemSchemaExample,
}: {
  tag: NomenclatureTag;
  insertItemSchema: CommonInsertSchema;
  insertItemSchemaExample: CommonInsertSchemaExample;
}) =>
  createRoute({
    method: 'post',
    path: '/create',
    tags: [tag],
    request: {
      body: {
        description: `<p>Insert a ${tag} object.</p>`,
        content: {
          'application/json': {
            schema: insertItemSchema,
            example: insertItemSchemaExample,
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

export default postCreateItem;
