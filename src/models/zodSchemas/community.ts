import { z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { community } from '@/models/schema';

export const selectCommunitySchema = createSelectSchema(community, {
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SelectCommunitySchema = z.infer<typeof selectCommunitySchema>;

export const insertCommunitySchema = createInsertSchema(community);

export const insertCommunitySchemaExample = {
  name: 'Community name',
  cityId: 'a5ug1fdwkkc4byl1uw9d7cqo',
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
  ({
    name,
    latitude,
    longitude,
    cityId,
    score,
    imageUrl,
    quadrant,
    sector,
    ward,
    population,
    dwellings,
    usedForRenting,
    area,
    density,
    averageIncome,
    lowIncome,
    immigrants,
    elevation,
    established,
    description,
  }) =>
    typeof name !== 'undefined' ||
    typeof latitude !== 'undefined' ||
    typeof longitude !== 'undefined' ||
    typeof cityId !== 'undefined' ||
    typeof score !== 'undefined' ||
    typeof imageUrl !== 'undefined' ||
    typeof quadrant !== 'undefined' ||
    typeof sector !== 'undefined' ||
    typeof ward !== 'undefined' ||
    typeof population !== 'undefined' ||
    typeof dwellings !== 'undefined' ||
    typeof usedForRenting !== 'undefined' ||
    typeof area !== 'undefined' ||
    typeof density !== 'undefined' ||
    typeof averageIncome !== 'undefined' ||
    typeof lowIncome !== 'undefined' ||
    typeof immigrants !== 'undefined' ||
    typeof elevation !== 'undefined' ||
    typeof established !== 'undefined' ||
    typeof description !== 'undefined',
  {
    message: 'at least one field must be provided for update',
    path: updatableCommunityFields,
  },
);

export const updateCommunitySchemaExample = {
  name: 'Community name',
  cityId: 'a5ug1fdwkkc4byl1uw9d7cqo',
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
