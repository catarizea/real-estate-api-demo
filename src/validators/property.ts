import { z } from '@hono/zod-openapi';

import { postmanIds } from '@/constants';

export const propertyBodySchemaExample = {
  and: [
    [
      'or',
      [
        ['gt', 'yearBuilt', 2010],
        ['lt', 'yearBuilt', 2020],
      ],
    ],
    [
      'or',
      [
        ['eq', 'cats', 1],
        ['eq', 'dogs', 1],
      ],
    ],
    ['eq', 'communityId', postmanIds.community],
    ['eq', 'cityId', postmanIds.city],
    ['eq', 'smoking', 0],
  ],
};

export const preparedPropertySchema = z.object({
  id: z.string(),
  listingId: z.number(),
  name: z.string(),
  address: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  yearBuilt: z.number().int().nullable(),
  descriptionTitle: z.string().nullable(),
  descriptionSubtitle: z.string().nullable(),
  descriptionText: z.string().nullable(),
  smoking: z.boolean(),
  cats: z.boolean(),
  dogs: z.boolean(),
  petsNegotiable: z.boolean(),
  petsFee: z.number().int().nullable(),
  petsFeeInterval: z.string().nullable(),
  published: z.boolean(),
  customerRanking: z.number(),
  paidSearchRanking: z.boolean(),
  city: z.object({ name: z.string() }),
  featureToProperty: z.array(
    z.object({ feature: z.object({ name: z.string() }) }).optional(),
  ),
  buildingFeatureToProperty: z.array(
    z.object({ buildingFeature: z.object({ name: z.string() }) }).optional(),
  ),
  community: z.object({
    name: z.string(),
    score: z.number().int().nullable(),
    imageUrl: z.string().nullable(),
    quadrant: z.string().nullable(),
    sector: z.string().nullable(),
    ward: z.string().nullable(),
    population: z.number().int().nullable(),
    dwellings: z.number().int().nullable(),
    usedForRenting: z.number().nullable(),
    area: z.number().nullable(),
    density: z.number().nullable(),
    averageIncome: z.number().int().nullable(),
    lowIncome: z.number().nullable(),
    immigrants: z.number().nullable(),
    elevation: z.number().int().nullable(),
    established: z.number().int().nullable(),
    description: z.string().nullable(),
    latitude: z.number(),
    longitude: z.number(),
    communityFeatureToCommunity: z.array(
      z.object({ communityFeature: z.object({ name: z.string() }) }).optional(),
    ),
  }),
  medias: z.array(
    z.object({ assetId: z.string(), order: z.number() }).optional(),
  ),
  parkings: z.array(
    z
      .object({ name: z.string(), fee: z.number(), feeInterval: z.string() })
      .optional(),
  ),
  typeProp: z.object({ name: z.string() }),
  floorPlans: z.array(
    z
      .object({
        id: z.string(),
        name: z.string(),
        order: z.number(),
        units: z.array(
          z
            .object({
              id: z.string(),
              name: z.string(),
              rent: z.number(),
              deposit: z.number().nullable(),
              available: z.boolean(),
              immediate: z.boolean(),
              availableDate: z.string().nullable(),
              shortterm: z.boolean(),
              longterm: z.boolean(),
              unitNumber: z.string().nullable(),
              unitName: z.string().nullable(),
              surface: z.number().int(),
              furnished: z.boolean(),
              heat: z.boolean(),
              water: z.boolean(),
              electricity: z.boolean(),
              internet: z.boolean(),
              television: z.boolean(),
              order: z.number().int(),
              published: z.boolean(),
              bedroom: z.object({ name: z.string() }),
              bathroom: z.object({ name: z.string() }),
            })
            .optional(),
        ),
      })
      .optional(),
  ),
});

export type PreparedPropertySchema = z.infer<typeof preparedPropertySchema>;

export const preparedPropertyForIndexSchema = z.object({
  id: z.string(),
  listingId: z.number(),
  address: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  smoking: z.boolean(),
  cats: z.boolean(),
  dogs: z.boolean(),
  featureToProperty: z.array(
    z.object({ feature: z.object({ name: z.string() }) }).optional(),
  ),
  community: z.object({ name: z.string() }).optional(),
  medias: z
    .array(z.object({ assetId: z.string(), order: z.number() }))
    .optional(),
  parkings: z.array(
    z.object({ name: z.string(), order: z.number() }).optional(),
  ),
  typeProp: z.object({ name: z.string() }),
});

export type PreparedPropertyForIndexSchema = z.infer<
  typeof preparedPropertyForIndexSchema
>;
