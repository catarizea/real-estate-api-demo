import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { city } from '@/models/schema';

export const selectCitySchema = createSelectSchema(city, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectCitySchema = z.infer<typeof selectCitySchema>;

export const insertCitySchema = createInsertSchema(city);

export const insertCitySchemaExample = {
  name: 'Toronto',
  regionId: 'atgl5rbiijouz9695d01vpne',
  latitude: '43.741667',
  longitude: '-79.373333',
};

export type InsertCitySchema = z.infer<typeof insertCitySchema>;

const updateSchema = z.object({
  name: z.string().optional(),
  regionId: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

export const updatableCityFields: string[] = updateSchema.keyof().options;

export const updateCitySchema = updateSchema.refine(
  ({ name, regionId, latitude, longitude }) =>
    typeof name !== 'undefined' ||
    typeof regionId !== 'undefined' ||
    typeof latitude !== 'undefined' ||
    typeof longitude !== 'undefined',
  {
    message: 'at least one field must be provided for update',
    path: updatableCityFields,
  },
);

export type UpdateCitySchema = z.infer<typeof updateCitySchema>;

export const updateCitySchemaExample = {
  name: 'Vancouver',
  regionId: 'atgl5rbiijouz9695d01vpne',
  latitude: '49.2827',
  longitude: '-123.1207',
};
