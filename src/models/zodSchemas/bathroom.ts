import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { bathroom } from '@/models/schema';

export const selectBathroomSchema = createSelectSchema(bathroom, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectBathroomSchema = z.infer<typeof selectBathroomSchema>;

export const insertBathroomSchema = createInsertSchema(bathroom);

export type InsertBathroomSchema = z.infer<typeof insertBathroomSchema>;
