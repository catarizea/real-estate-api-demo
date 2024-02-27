import { createRoute, z } from '@hono/zod-openapi';

import { NomenclatureTag } from '@/types';

const successSchema = z.object({
  message: z.string(),
});

export type SuccessSchema = z.infer<typeof successSchema>;

const getHome = createRoute({
  method: 'get',
  path: '/',
  tags: [NomenclatureTag.Home],
  security: [
    {
      Bearer: [],
    },
  ],
  responses: {
    200: {
      description: 'Responds with a message',
      content: {
        'application/json': {
          schema: successSchema,
        },
      },
    },
  },
});

export default getHome;
