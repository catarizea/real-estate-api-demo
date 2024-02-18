import { and, eq } from 'drizzle-orm';

import { db } from '@/models';
import { featureToProperty } from '@/models/schema';
import { badRequestResponse } from '@/utils';

const deleteFeatureToProperty = async (itemId: string, featureId: string) => {
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

  const featureExists = await db.query.feature.findFirst({
    where: (feature, { eq }) => eq(feature.id, featureId),
  });

  if (!featureExists) {
    return badRequestResponse({
      reason: 'validation error',
      message: `feature with id ${featureId} does not exist`,
      path: ['featureId'],
    });
  }

  const result = await db
    .delete(featureToProperty)
    .where(
      and(
        eq(featureToProperty.propertyId, itemId),
        eq(featureToProperty.featureId, featureId),
      ),
    );

  if (result.rowsAffected === 0) {
    return badRequestResponse({
      reason: 'validation error',
      message: `feature with id ${featureId} does not exist in property with id ${itemId}`,
      path: ['featureId', 'itemId'],
    });
  }
};

export default deleteFeatureToProperty;
