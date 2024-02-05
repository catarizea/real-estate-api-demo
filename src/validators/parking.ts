import { z } from '@hono/zod-openapi';

export const parkingsByPropertySuccessSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    fee: z.nullable(z.number().int()),
    feeInterval: z.nullable(z.string()),
    order: z.number().int(),
  }),
);
