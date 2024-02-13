import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { floorPlan } from '@/models/schema';

export const selectFloorPlanSchema = createSelectSchema(floorPlan, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectFloorPlanSchema = z.infer<typeof selectFloorPlanSchema>;

export const insertFloorPlanSchema = createInsertSchema(floorPlan);

export const insertFloorPlanSchemaExample = {
  name: 'Floor Plan 1',
  propertyId: 'atgl5rbiijouz9695d01vpne',
  order: 0,
};

export type InsertFloorPlanSchema = z.infer<typeof insertFloorPlanSchema>;

export const updateFloorPlanSchema = z
  .object({
    name: z.string().optional(),
    propertyId: z.string().optional(),
    order: z.number().optional(),
  })
  .refine(
    ({ name, propertyId, order }) =>
      typeof name !== 'undefined' ||
      typeof propertyId !== 'undefined' ||
      typeof order !== 'undefined',
    {
      message: 'at least one field must be provided for update',
      path: ['name', 'propertyId', 'order'],
    },
  );

export type UpdateFloorPlanSchema = z.infer<typeof updateFloorPlanSchema>;

export const updateFloorPlanSchemaExample = {
  name: 'Floor Plan 2',
  order: 1,
};
