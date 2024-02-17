import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { postmanIds } from '@/constants';
import { floorPlan } from '@/models/schema';
import { atLeastOneFieldDefined } from '@/utils';

export const selectFloorPlanSchema = createSelectSchema(floorPlan, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectFloorPlanSchema = z.infer<typeof selectFloorPlanSchema>;

export const insertFloorPlanSchema = createInsertSchema(floorPlan);

export const insertFloorPlanSchemaExample = {
  name: 'Floor Plan 1',
  propertyId: postmanIds.property,
  order: 0,
};

export type InsertFloorPlanSchema = z.infer<typeof insertFloorPlanSchema>;

const updateSchema = z.object({
  name: z.string().optional(),
  propertyId: z.string().optional(),
  order: z.number().optional(),
});

export const updatableFloorPlanFields: string[] = updateSchema.keyof().options;

export const updateFloorPlanSchema = updateSchema.refine(
  (fields) => atLeastOneFieldDefined(fields, updatableFloorPlanFields),
  {
    message: 'at least one field must be provided for update',
    path: updatableFloorPlanFields,
  },
);

export type UpdateFloorPlanSchema = z.infer<typeof updateFloorPlanSchema>;

export const updateFloorPlanSchemaExample = {
  name: 'Floor Plan 2',
  order: 1,
};
