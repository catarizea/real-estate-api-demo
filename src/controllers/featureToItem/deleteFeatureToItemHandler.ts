import { z } from '@hono/zod-openapi';
import { and, eq } from 'drizzle-orm';
import { Context } from 'hono';

import { db } from '@/models';
import {
  buildingFeatureToProperty,
  communityFeatureToCommunity,
  featureToProperty,
} from '@/models/schema';
import { NomenclatureTag } from '@/types';
import { badRequestResponse } from '@/utils';

const deleteFeatureToItemHandler =
  (
    tag:
      | NomenclatureTag.CommunityFeatureToCommunity
      | NomenclatureTag.BuildingFeatureToProperty
      | NomenclatureTag.FeatureToProperty,
  ) =>
  async (c: Context) => {
    const itemId = c.req.param('itemId');
    const featureId = c.req.param('featureId');

    if (tag === NomenclatureTag.CommunityFeatureToCommunity) {
      const communityExists = await db.query.community.findFirst({
        where: (community, { eq }) => eq(community.id, itemId),
      });

      if (!communityExists) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `community with id ${itemId} does not exist`,
            path: ['itemId'],
          }),
          400,
        );
      }

      const communityFeatureExists = await db.query.communityFeature.findFirst({
        where: (communityFeature, { eq }) => eq(communityFeature.id, featureId),
      });

      if (!communityFeatureExists) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `communityFeature with id ${featureId} does not exist`,
            path: ['featureId'],
          }),
          400,
        );
      }

      try {
        await db
          .delete(communityFeatureToCommunity)
          .where(
            and(
              eq(communityFeatureToCommunity.communityId, itemId),
              eq(communityFeatureToCommunity.communityFeatureId, featureId),
            ),
          );

        return c.json({ success: z.literal(true).value });
      } catch (error) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `communityFeature with id ${featureId} does not exist in community with id ${itemId}`,
            path: ['featureId', 'itemId'],
          }),
          400,
        );
      }
    }

    if (tag === NomenclatureTag.BuildingFeatureToProperty) {
      const propertyExists = await db.query.property.findFirst({
        where: (property, { eq }) => eq(property.id, itemId),
      });

      if (!propertyExists) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `property with id ${itemId} does not exist`,
            path: ['itemId'],
          }),
          400,
        );
      }

      const buildingFeatureExists = await db.query.buildingFeature.findFirst({
        where: (buildingFeature, { eq }) => eq(buildingFeature.id, featureId),
      });

      if (!buildingFeatureExists) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `buildingFeature with id ${featureId} does not exist`,
            path: ['featureId'],
          }),
          400,
        );
      }

      try {
        await db
          .delete(buildingFeatureToProperty)
          .where(
            and(
              eq(buildingFeatureToProperty.propertyId, itemId),
              eq(buildingFeatureToProperty.buildingFeatureId, featureId),
            ),
          );

        return c.json({ success: z.literal(true).value });
      } catch (error) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `buildingFeature with id ${featureId} does not exist in property with id ${itemId}`,
            path: ['featureId', 'itemId'],
          }),
          400,
        );
      }
    }

    if (tag === NomenclatureTag.FeatureToProperty) {
      const propertyExists = await db.query.property.findFirst({
        where: (property, { eq }) => eq(property.id, itemId),
      });

      if (!propertyExists) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `property with id ${itemId} does not exist`,
            path: ['itemId'],
          }),
          400,
        );
      }

      const featureExists = await db.query.feature.findFirst({
        where: (feature, { eq }) => eq(feature.id, featureId),
      });

      if (!featureExists) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `feature with id ${featureId} does not exist`,
            path: ['featureId'],
          }),
          400,
        );
      }

      try {
        await db
          .delete(featureToProperty)
          .where(
            and(
              eq(featureToProperty.propertyId, itemId),
              eq(featureToProperty.featureId, featureId),
            ),
          );

        return c.json({ success: z.literal(true).value });
      } catch (error) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `feature with id ${featureId} does not exist in property with id ${itemId}`,
            path: ['featureId', 'itemId'],
          }),
          400,
        );
      }
    }

    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: `unknown tag ${tag}`,
        path: ['tag'],
      }),
      400,
    );
  };

export default deleteFeatureToItemHandler;
