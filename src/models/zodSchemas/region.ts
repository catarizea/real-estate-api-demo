import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { region } from '@/models/schema';
import { atLeastOneFieldDefined } from '@/utils';

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

const updateSchema = z.object({
  name: z.string().optional(),
  administrativeName: z.string().optional(),
});

export const updatableRegionFields: string[] = updateSchema.keyof().options;

export const updateRegionSchema = updateSchema.refine(
  (fields) => atLeastOneFieldDefined(fields, updatableRegionFields),
  {
    message: 'at least one field must be provided for update',
    path: updatableRegionFields,
  },
);

export type UpdateRegionSchema = z.infer<typeof updateRegionSchema>;

export const updateRegionSchemaExample = {
  administrativeName: 'State',
};
