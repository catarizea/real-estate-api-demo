import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { city, community, property } from '@/models/schema';
import {
  InsertCommunitySchema,
  UpdateCommunitySchema,
} from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customInsertCommunityCheck = async (
  body: InsertCommunitySchema | UpdateCommunitySchema,
  id?: string,
) => {
  let existingItem: { id: string; name: string }[] | null = null;

  if (id) {
    const existing = await db
      .select({ id: community.id, name: community.name })
      .from(community)
      .where(eq(community.id, id));

    if (existing.length > 0) {
      existingItem = existing;
    }
  }

  if (body.cityId) {
    const cityExists = await db
      .select()
      .from(city)
      .where(eq(city.id, body.cityId))
      .limit(1);

    if (cityExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `city with id ${body.cityId} does not exist`,
          path: ['cityId'],
        }),
      );
    }
  }

  if (body.name && existingItem && body.name !== existingItem[0].name) {
    const propertyExists = await db
      .select({ id: property.id })
      .from(property)
      .where(eq(property.communityId, existingItem[0].id))
      .limit(1);

    if (propertyExists.length > 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `name cannot be replaced for community with id ${id} because it has children and it would change the meaning`,
          path: ['name'],
        }),
      );
    }
  }

  return null;
};

export default customInsertCommunityCheck;
