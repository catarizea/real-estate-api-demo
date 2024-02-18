import { db } from '@/models';
import { buildingFeatureToProperty } from '@/models/schema';
import { badRequestResponse } from '@/utils';
import { FeatureToItemSchema } from '@/validators';

const createBuildingFeatureToProperty = async (body: FeatureToItemSchema) => {
  const validBuildingFeature = await db.query.buildingFeature.findFirst({
    where: (buildingFeature, { eq }) => eq(buildingFeature.id, body.featureId),
  });

  if (!validBuildingFeature) {
    return badRequestResponse({
      reason: 'validation error',
      message: `buildingFeature with id ${body.featureId} does not exist`,
      path: ['featureId'],
    });
  }

  const validBuilding = await db.query.property.findFirst({
    where: (property, { eq }) => eq(property.id, body.itemId),
  });

  if (!validBuilding) {
    return badRequestResponse({
      reason: 'validation error',
      message: `property with id ${body.itemId} does not exist`,
      path: ['itemId'],
    });
  }

  const alreadyExists = await db.query.buildingFeatureToProperty.findFirst({
    where: (buildingFeatureToProperty, { and, eq }) =>
      and(
        eq(buildingFeatureToProperty.buildingFeatureId, body.featureId),
        eq(buildingFeatureToProperty.propertyId, body.itemId),
      ),
  });

  if (alreadyExists) {
    return badRequestResponse({
      reason: 'validation error',
      message: `buildingFeature with id ${body.featureId} already exists for property with id ${body.itemId}`,
      path: ['featureId', 'itemId'],
    });
  }

  await db.insert(buildingFeatureToProperty).values({
    buildingFeatureId: body.featureId,
    propertyId: body.itemId,
  });
};

export default createBuildingFeatureToProperty;
