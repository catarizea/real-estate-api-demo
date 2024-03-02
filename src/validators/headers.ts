import { z } from '@hono/zod-openapi';

export const headersSchema = z.object({
  authorization: z.string().openapi({
    example: 'Bearer SECRET',
  }),
});
