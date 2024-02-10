import { z } from '@hono/zod-openapi';

export const bodyCommunityListSchemaExample = {
  and: [
    [
      'or',
      [
        ['eq', 'name', 'Community name 1'],
        ['eq', 'name', 'Community name 1'],
      ],
    ],
    ['gt', 'area', 3],
    ['lt', 'population', 2000],
    ['eq', 'quadrant', 'NW'],
  ],
};

export const preparedCommunitySchema = z.object({
  id: z.string(),
  name: z.string(),
  score: z.number().int().nullable(),
  imageUrl: z.string().nullable(),
  quadrant: z.string().nullable(),
  sector: z.string().nullable(),
  ward: z.string().nullable(),
  population: z.number().int().nullable(),
  dwellings: z.number().int().nullable(),
  usedForRenting: z.string().nullable(),
  area: z.string().nullable(),
  density: z.string().nullable(),
  averageIncome: z.number().int().nullable(),
  lowIncome: z.string().nullable(),
  immigrants: z.string().nullable(),
  elevation: z.number().int().nullable(),
  established: z.number().int().nullable(),
  description: z.string().nullable(),
  latitude: z.string(),
  longitude: z.string(),
  city: z.object({ name: z.string() }),
  communityFeatureToCommunity: z.array(
    z.object({ communityFeature: z.object({ name: z.string() }) }).optional(),
  ),
});

export type PreparedCommunitySchema = z.infer<typeof preparedCommunitySchema>;
