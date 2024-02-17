import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { buildingFeature, buildingFeatureToProperty } from '@/models/schema';
import { UpdateBathroomSchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customUpdateBuildingFeatureCheck = async (
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
    .select({ name: buildingFeature.name })
    .from(buildingFeature)
    .where(eq(buildingFeature.id, id));

  if (existingItem.length === 0) {
    return JSON.stringify(
      badRequestResponse({
        reason: 'validation error',
        message: `buildingFeature with id ${id} does not exist`,
        path: ['id'],
      }),
    );
  }

  if (body.name && body.name !== existingItem[0].name) {
    const childExists = await db
      .select()
      .from(buildingFeatureToProperty)
      .where(eq(buildingFeatureToProperty.buildingFeatureId, id))
      .limit(1);

    if (childExists.length > 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `name cannot be replaced for buildingFeature with id ${id} because it has children and it would change the meaning`,
          path: ['name'],
        }),
      );
    }
  }

  return null;
};

export default customUpdateBuildingFeatureCheck;
