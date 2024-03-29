import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { postmanIds } from '@/constants';
import { community } from '@/models/schema';
import { atLeastOneFieldDefined } from '@/utils';

export const selectCommunitySchema = createSelectSchema(community, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectCommunitySchema = z.infer<typeof selectCommunitySchema>;

export const insertCommunitySchema = createInsertSchema(community);

export const insertCommunitySchemaExample = {
  name: 'Community name',
  cityId: postmanIds.city,
  latitude: '51.0447',
  longitude: '-114.0719',
};

export type InsertCommunitySchema = z.infer<typeof insertCommunitySchema>;

const updateSchema = z.object({
  name: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  cityId: z.string().optional(),
  score: z.number().int().optional(),
  imageUrl: z.string().optional(),
  quadrant: z.string().optional(),
  sector: z.string().optional(),
  ward: z.string().optional(),
  population: z.number().int().optional(),
  dwellings: z.number().int().optional(),
  usedForRenting: z.number().optional(),
  area: z.number().optional(),
  density: z.number().optional(),
  averageIncome: z.number().int().optional(),
  lowIncome: z.number().optional(),
  immigrants: z.number().optional(),
  elevation: z.number().int().optional(),
  established: z.number().int().optional(),
  description: z.string().optional(),
});

export const updatableCommunityFields: string[] = updateSchema.keyof().options;

export const updateCommunitySchema = updateSchema.refine(
  (fields) => atLeastOneFieldDefined(fields, updatableCommunityFields),
  {
    message: 'at least one field must be provided for update',
    path: updatableCommunityFields,
  },
);

export const updateCommunitySchemaExample = {
  latitude: '51.0447',
  longitude: '-114.0719',
  imageUrl: 'https://example.com/image.jpg',
  quadrant: 'NW',
  sector: 'SE',
  ward: 'Ward 1',
  population: 1000,
  dwellings: 500,
  usedForRenting: 30.45,
  area: 3.2,
  density: 10.5,
  averageIncome: 50000,
};

export type UpdateCommunitySchema = z.infer<typeof updateCommunitySchema>;
