import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { bathroom } from '@/models/schema';

export const selectBathroomSchema = createSelectSchema(bathroom, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectBathroomSchema = z.infer<typeof selectBathroomSchema>;

export const insertBathroomSchema = createInsertSchema(bathroom);

export const updateBathroomSchema = z.union([
  z.object({
    name: z.string(),
    order: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
  z.object({
    order: z.number().int(),
  }),
]);

export type UpdateBathroomSchema = z.infer<typeof updateBathroomSchema>;

export type InsertBathroomSchema = z.infer<typeof insertBathroomSchema>;
