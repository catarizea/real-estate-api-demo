import { z } from '@hono/zod-openapi';
import { createSelectSchema } from 'drizzle-zod';

import { bathroom } from '@/models/schema';

export const selectBathroomSchema = createSelectSchema(bathroom, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectBathroomSchema = z.infer<typeof selectBathroomSchema>;
