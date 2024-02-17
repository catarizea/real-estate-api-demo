import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { postmanIds } from '@/constants';
import { city } from '@/models/schema';
import { atLeastOneFieldDefined } from '@/utils';

export const selectCitySchema = createSelectSchema(city, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectCitySchema = z.infer<typeof selectCitySchema>;

export const insertCitySchema = createInsertSchema(city);

export const insertCitySchemaExample = {
  name: 'Toronto',
  regionId: postmanIds.region,
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
  (fields) => atLeastOneFieldDefined(fields, updatableCityFields),
  {
    message: 'at least one field must be provided for update',
    path: updatableCityFields,
  },
);

export type UpdateCitySchema = z.infer<typeof updateCitySchema>;

export const updateCitySchemaExample = {
  latitude: '49.2827',
  longitude: '-123.1207',
};
