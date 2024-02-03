import { createRoute, z } from '@hono/zod-openapi';

import { updateBathroomSchema } from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { errorSchema } from '@/validators';

export const successSchema = z.object({
  success: z.literal(true),
  data: z.object({ id: z.string() }),
});

const putUpdateNomenclature = (tag: NomenclatureTag) =>
  createRoute({
    method: 'put',
    path: '/update/{id}',
    tags: [tag],
    request: {
      params: z.object({
        id: z.string(),
      }),
      body: {
        description: `<p>Update a ${tag} object.</p>`,
        content: {
          'application/json': {
            schema: updateBathroomSchema,
            example: {
              name: '1.5',
              order: 1,
            },
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
        description: 'Responds with an error message.',
        content: {
          'application/json': {
            schema: errorSchema,
          },
        },
      },
    },
  });

export default putUpdateNomenclature;
