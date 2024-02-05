import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { parking } from '@/models/schema';

export const selectParkingSchema = createSelectSchema(parking, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectParkingSchema = z.infer<typeof selectParkingSchema>;

export const insertParkingSchema = createInsertSchema(parking);

export type InsertParkingSchema = z.infer<typeof insertParkingSchema>;

export const updateParkingSchema = z
  .object({
    name: z.string().optional(),
    fee: z.number().int().optional(),
    feeInterval: z.string().optional(),
    order: z.number().int().optional(),
  })
  .refine(
    ({ name, fee, feeInterval, order }) =>
      typeof name !== 'undefined' ||
      typeof fee !== 'undefined' ||
      typeof feeInterval !== 'undefined' ||
      typeof order !== 'undefined',
    {
      message: 'name or fee or feeInterval or order is required',
      path: ['name', 'fee', 'feeInterval', 'order'],
    },
  );

export type UpdateParkingSchema = z.infer<typeof updateParkingSchema>;
