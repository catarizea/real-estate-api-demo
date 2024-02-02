import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { bathroom } from '@/models/schema';

export const selectBathroomSchema = createSelectSchema(bathroom, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectBathroomSchema = z.infer<typeof selectBathroomSchema>;

export const insertBathroomSchema = createInsertSchema(bathroom);

export const updateBathroomSchema = z
  .object({
    name: z.string().optional(),
    order: z.number().int().optional(),
  })
  .refine(
    ({ name, order }) =>
      typeof name !== 'undefined' || typeof order !== 'undefined',
    { message: 'name or order is required', path: ['name', 'order'] },
  );

export type UpdateBathroomSchema = z.infer<typeof updateBathroomSchema>;

export type InsertBathroomSchema = z.infer<typeof insertBathroomSchema>;
