import { z } from '@hono/zod-openapi';

export const featureToItemSchema = z.object({
  featureId: z.string(),
  itemId: z.string(),
});

export type FeatureToItemSchema = z.infer<typeof featureToItemSchema>;

export const featureToPropertySuccessSchema = z.array(
  z.object({
    featureId: z.string(),
    feature: z.object({
      name: z.string(),
    }),
  }),
);

export type FeatureToPropertySuccessSchema = z.infer<
  typeof featureToPropertySuccessSchema
>;

export const buildingFeatureToPropertySuccessSchema = z.array(
  z.object({
    buildingFeatureId: z.string(),
    buildingFeature: z.object({
      name: z.string(),
    }),
  }),
);

export type BuildingFeatureToPropertySuccessSchema = z.infer<
  typeof buildingFeatureToPropertySuccessSchema
>;

export const communityFeatureToPropertySuccessSchema = z.array(
  z.object({
    communityFeatureId: z.string(),
    communityFeature: z.object({
      name: z.string(),
    }),
  }),
);

export type CommunityFeatureToPropertySuccessSchema = z.infer<
  typeof communityFeatureToPropertySuccessSchema
>;
