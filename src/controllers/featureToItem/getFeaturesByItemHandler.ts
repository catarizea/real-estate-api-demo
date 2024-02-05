import { z } from '@hono/zod-openapi';
import { Context } from 'hono';

import { db } from '@/models';
import {
  preparedBuildingFeaturesByProperty,
  preparedCommunityFeaturesByCommunity,
  preparedFeaturesByProperty,
} from '@/models/preparedStatements';
import { NomenclatureTag } from '@/types';
import { badRequestResponse } from '@/utils';

const getFeaturesByItemHandler =
  (
    tag:
      | NomenclatureTag.FeatureToProperty
      | NomenclatureTag.BuildingFeatureToProperty
      | NomenclatureTag.CommunityFeatureToCommunity,
  ) =>
  async (c: Context) => {
    const itemId = c.req.param('itemId');

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

      const features = await preparedFeaturesByProperty.execute({
        propertyId: itemId,
      });

      return c.json({ success: z.literal(true).value, data: features });
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

      const buildingFeatures = await preparedBuildingFeaturesByProperty.execute(
        {
          propertyId: itemId,
        },
      );

      return c.json({
        success: z.literal(true).value,
        data: buildingFeatures,
      });
    }

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

      const communityFeatures =
        await preparedCommunityFeaturesByCommunity.execute({
          communityId: itemId,
        });

      return c.json({
        success: z.literal(true).value,
        data: communityFeatures,
      });
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

export default getFeaturesByItemHandler;
