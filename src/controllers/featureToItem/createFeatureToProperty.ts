import { db } from '@/models';
import { featureToProperty } from '@/models/schema';
import { badRequestResponse } from '@/utils';
import { FeatureToItemSchema } from '@/validators';

const createFeatureToProperty = async (body: FeatureToItemSchema) => {
  const validFeature = await db.query.feature.findFirst({
    where: (feature, { eq }) => eq(feature.id, body.featureId),
  });

  if (!validFeature) {
    return badRequestResponse({
      reason: 'validation error',
      message: `feature with id ${body.featureId} does not exist`,
      path: ['featureId'],
    });
  }

  const validProperty = await db.query.property.findFirst({
    where: (property, { eq }) => eq(property.id, body.itemId),
  });

  if (!validProperty) {
    return badRequestResponse({
      reason: 'validation error',
      message: `property with id ${body.itemId} does not exist`,
      path: ['itemId'],
    });
  }

  const alreadyExists = await db.query.featureToProperty.findFirst({
    where: (featureToProperty, { and, eq }) =>
      and(
        eq(featureToProperty.featureId, body.featureId),
        eq(featureToProperty.propertyId, body.itemId),
      ),
  });

  if (alreadyExists) {
    return badRequestResponse({
      reason: 'validation error',
      message: `feature with id ${body.featureId} already exists for property with id ${body.itemId}`,
      path: ['featureId', 'itemId'],
    });
  }

  await db.insert(featureToProperty).values({
    featureId: body.featureId,
    propertyId: body.itemId,
  });
};

export default createFeatureToProperty;
