import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { city, community, property, region } from '@/models/schema';
import { InsertCitySchema, UpdateCitySchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customInsertCityCheck = async (
  body: InsertCitySchema | UpdateCitySchema,
  id?: string,
) => {
  let existingItem: (typeof city.$inferSelect)[] | null = null;

  if (id) {
    const existing = await db.select().from(city).where(eq(city.id, id));

    if (existing.length > 0) {
      existingItem = existing;
    }
  }

  if (body.regionId) {
    const regionExists = await db
      .select()
      .from(region)
      .where(eq(region.id, body.regionId))
      .limit(1);

    if (regionExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `region with id ${body.regionId} does not exist`,
          path: ['regionId'],
        }),
      );
    }
  }

  if (body.name && existingItem && body.name !== existingItem[0].name) {
    const communityExists = await db
      .select()
      .from(community)
      .where(eq(community.cityId, existingItem[0].id))
      .limit(1);

    const propertyExists = await db
      .select()
      .from(property)
      .where(eq(property.cityId, existingItem[0].id))
      .limit(1);

    if (communityExists.length > 0 || propertyExists.length > 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `name cannot be replaced for city with id ${id} because it has children and it would change the meaning`,
          path: ['name'],
        }),
      );
    }
  }

  return null;
};

export default customInsertCityCheck;
