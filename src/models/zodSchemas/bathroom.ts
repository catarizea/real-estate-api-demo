import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { bathroom } from '@/models/schema';

export const selectBathroomSchema = createSelectSchema(bathroom, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectBathroomSchema = z.infer<typeof selectBathroomSchema>;

export const insertBathroomSchema = createInsertSchema(bathroom);

export const insertBathroomSchemaExample = {
  name: '1.5',
  order: 1,
};

const updateSchema = z.object({
  name: z.string().optional(),
  order: z.number().int().optional(),
});

export const updatableBathroomFields: string[] = updateSchema.keyof().options;

export const updateBathroomSchema = updateSchema.refine(
  ({ name, order }) =>
    typeof name !== 'undefined' || typeof order !== 'undefined',
  {
    message: 'at least one field must be provided for update',
    path: updatableBathroomFields,
  },
);

export const updateBathroomSchemaExample = {
  name: '1.5',
  order: 1,
};

export type UpdateBathroomSchema = z.infer<typeof updateBathroomSchema>;

export type InsertBathroomSchema = z.infer<typeof insertBathroomSchema>;
