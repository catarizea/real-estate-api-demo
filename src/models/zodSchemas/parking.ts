import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { postmanIds } from '@/constants';
import { parking } from '@/models/schema';
import { atLeastOneFieldDefined } from '@/utils';

export const selectParkingSchema = createSelectSchema(parking, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectParkingSchema = z.infer<typeof selectParkingSchema>;

export const insertParkingSchema = createInsertSchema(parking);

export const insertParkingSchemaExample = {
  name: 'Covered',
  propertyId: postmanIds.property,
  fee: 100,
  feeInterval: 'monthly',
  order: 1,
};

export type InsertParkingSchema = z.infer<typeof insertParkingSchema>;

const updateSchema = z.object({
  name: z.string().optional(),
  fee: z.number().int().optional(),
  feeInterval: z.string().optional(),
  order: z.number().int().optional(),
});

export const updatableParkingFields: string[] = updateSchema.keyof().options;

export const updateParkingSchema = updateSchema.refine(
  (fields) => atLeastOneFieldDefined(fields, updatableParkingFields),
  {
    message: 'name or fee or feeInterval or order is required',
    path: updatableParkingFields,
  },
);

export const updateParkingSchemaExample = {
  name: 'Covered',
  fee: 100,
  feeInterval: 'monthly',
  order: 1,
};

export type UpdateParkingSchema = z.infer<typeof updateParkingSchema>;
