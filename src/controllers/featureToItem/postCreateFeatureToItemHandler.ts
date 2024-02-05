import { z } from '@hono/zod-openapi';
import { Context } from 'hono';

import { db } from '@/models';
import {
  buildingFeatureToProperty,
  communityFeatureToCommunity,
  featureToProperty,
} from '@/models/schema';
import { NomenclatureTag } from '@/types';
import { badRequestResponse } from '@/utils';
import { FeatureToItemSchema } from '@/validators';

const postCreateFeatureToItemHandler =
  (
    tag:
      | NomenclatureTag.CommunityFeatureToCommunity
      | NomenclatureTag.FeatureToProperty
      | NomenclatureTag.BuildingFeatureToProperty,
  ) =>
  async (c: Context) => {
    const body: FeatureToItemSchema = await c.req.json();

    if (tag === NomenclatureTag.CommunityFeatureToCommunity) {
      const validCommunityFeature = await db.query.communityFeature.findFirst({
        where: (communityFeature, { eq }) =>
          eq(communityFeature.id, body.featureId),
      });

      if (!validCommunityFeature) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `communityFeature with id ${body.featureId} does not exist`,
            path: ['featureId'],
          }),
          400,
        );
      }

      const validCommunity = await db.query.community.findFirst({
        where: (community, { eq }) => eq(community.id, body.itemId),
      });

      if (!validCommunity) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `community with id ${body.itemId} does not exist`,
            path: ['itemId'],
          }),
          400,
        );
      }

      const alreadyExists =
        await db.query.communityFeatureToCommunity.findFirst({
          where: (communityFeatureToCommunity, { and, eq }) =>
            and(
              eq(
                communityFeatureToCommunity.communityFeatureId,
                body.featureId,
              ),
              eq(communityFeatureToCommunity.communityId, body.itemId),
            ),
        });

      if (alreadyExists) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `communityFeature with id ${body.featureId} already exists for community with id ${body.itemId}`,
            path: ['featureId', 'itemId'],
          }),
          400,
        );
      }

      await db.insert(communityFeatureToCommunity).values({
        communityFeatureId: body.featureId,
        communityId: body.itemId,
      });
    }

    if (tag === NomenclatureTag.FeatureToProperty) {
      const validFeature = await db.query.feature.findFirst({
        where: (feature, { eq }) => eq(feature.id, body.featureId),
      });

      if (!validFeature) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `feature with id ${body.featureId} does not exist`,
            path: ['featureId'],
          }),
          400,
        );
      }

      const validProperty = await db.query.property.findFirst({
        where: (property, { eq }) => eq(property.id, body.itemId),
      });

      if (!validProperty) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `property with id ${body.itemId} does not exist`,
            path: ['itemId'],
          }),
          400,
        );
      }

      const alreadyExists = await db.query.featureToProperty.findFirst({
        where: (featureToProperty, { and, eq }) =>
          and(
            eq(featureToProperty.featureId, body.featureId),
            eq(featureToProperty.propertyId, body.itemId),
          ),
      });

      if (alreadyExists) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `feature with id ${body.featureId} already exists for property with id ${body.itemId}`,
            path: ['featureId', 'itemId'],
          }),
          400,
        );
      }

      await db.insert(featureToProperty).values({
        featureId: body.featureId,
        propertyId: body.itemId,
      });
    }

    if (tag === NomenclatureTag.BuildingFeatureToProperty) {
      const validBuildingFeature = await db.query.buildingFeature.findFirst({
        where: (buildingFeature, { eq }) =>
          eq(buildingFeature.id, body.featureId),
      });

      if (!validBuildingFeature) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `buildingFeature with id ${body.featureId} does not exist`,
            path: ['featureId'],
          }),
          400,
        );
      }

      const validBuilding = await db.query.property.findFirst({
        where: (property, { eq }) => eq(property.id, body.itemId),
      });

      if (!validBuilding) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `property with id ${body.itemId} does not exist`,
            path: ['itemId'],
          }),
          400,
        );
      }

      const alreadyExists = await db.query.buildingFeatureToProperty.findFirst({
        where: (buildingFeatureToProperty, { and, eq }) =>
          and(
            eq(buildingFeatureToProperty.buildingFeatureId, body.featureId),
            eq(buildingFeatureToProperty.propertyId, body.itemId),
          ),
      });

      if (alreadyExists) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: `buildingFeature with id ${body.featureId} already exists for property with id ${body.itemId}`,
            path: ['featureId', 'itemId'],
          }),
          400,
        );
      }

      await db.insert(buildingFeatureToProperty).values({
        buildingFeatureId: body.featureId,
        propertyId: body.itemId,
      });
    }

    return c.json({ success: z.literal(true).value }, 201);
  };

export default postCreateFeatureToItemHandler;
