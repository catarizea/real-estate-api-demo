import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { feature, featureToProperty } from '@/models/schema';
import { UpdateBathroomSchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customUpdateFeatureCheck = async (
  body: UpdateBathroomSchema,
  id?: string,
) => {
  if (!id) {
    return JSON.stringify(
      badRequestResponse({
        reason: 'validation error',
        message: `id query param is missing`,
        path: ['id'],
      }),
    );
  }

  const existingItem = await db
    .select()
    .from(feature)
    .where(eq(feature.id, id));

  if (existingItem.length === 0) {
    return JSON.stringify(
      badRequestResponse({
        reason: 'validation error',
        message: `feature with id ${id} does not exist`,
        path: ['id'],
      }),
    );
  }

  if (body.name && body.name !== existingItem[0].name) {
    const childExists = await db
      .select()
      .from(featureToProperty)
      .where(eq(featureToProperty.featureId, id))
      .limit(1);

    if (childExists.length > 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `name cannot be replaced for feature with id ${id} because it has children and it would change the meaning`,
          path: ['name'],
        }),
      );
    }
  }

  return null;
};

export default customUpdateFeatureCheck;
