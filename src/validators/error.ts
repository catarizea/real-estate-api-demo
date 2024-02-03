import { z } from '@hono/zod-openapi';

export const errorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    reason: z.string(),
    issues: z
      .array(z.object({ message: z.string(), path: z.array(z.string()) }))
      .optional(),
  }),
});

export type ErrorSchema = z.infer<typeof errorSchema>;
