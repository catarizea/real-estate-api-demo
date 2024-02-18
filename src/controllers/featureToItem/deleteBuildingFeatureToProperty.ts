import { and, eq } from 'drizzle-orm';

import { db } from '@/models';
import { buildingFeatureToProperty } from '@/models/schema';
import { badRequestResponse } from '@/utils';

const deleteBuildingFeatureToProperty = async (
  itemId: string,
  featureId: string,
) => {
  const propertyExists = await db.query.property.findFirst({
    where: (property, { eq }) => eq(property.id, itemId),
  });

  if (!propertyExists) {
    return badRequestResponse({
      reason: 'validation error',
      message: `property with id ${itemId} does not exist`,
      path: ['itemId'],
    });
  }

  const buildingFeatureExists = await db.query.buildingFeature.findFirst({
    where: (buildingFeature, { eq }) => eq(buildingFeature.id, featureId),
  });

  if (!buildingFeatureExists) {
    return badRequestResponse({
      reason: 'validation error',
      message: `buildingFeature with id ${featureId} does not exist`,
      path: ['featureId'],
    });
  }

  const result = await db
    .delete(buildingFeatureToProperty)
    .where(
      and(
        eq(buildingFeatureToProperty.propertyId, itemId),
        eq(buildingFeatureToProperty.buildingFeatureId, featureId),
      ),
    );

  if (result.rowsAffected === 0) {
    return badRequestResponse({
      reason: 'validation error',
      message: `buildingFeature with id ${featureId} does not exist in property with id ${itemId}`,
      path: ['featureId', 'itemId'],
    });
  }
};

export default deleteBuildingFeatureToProperty;
