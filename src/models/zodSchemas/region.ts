import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { region } from '@/models/schema';

export const selectRegionSchema = createSelectSchema(region, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectRegionSchema = z.infer<typeof selectRegionSchema>;

export const insertRegionSchema = createInsertSchema(region);

export const insertRegionSchemaExample = {
  name: 'Ontario',
  administrativeName: 'Province',
};

export type InsertRegionSchema = z.infer<typeof insertRegionSchema>;

export const updateRegionSchema = z
  .object({
    name: z.string().optional(),
    administrativeName: z.string().optional(),
  })
  .refine(
    ({ name, administrativeName }) =>
      typeof name !== 'undefined' || typeof administrativeName !== 'undefined',
    {
      message: 'at least one field must be provided for update',
      path: ['name', 'administrativeName'],
    },
  );

export type UpdateRegionSchema = z.infer<typeof updateRegionSchema>;

export const updateRegionSchemaExample = {
  name: 'British Columbia',
  administrativeName: 'Province',
};
