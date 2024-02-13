import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { city, region } from '@/models/schema';
import { UpdateRegionSchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customUpdateRegionCheck = async (
  body: UpdateRegionSchema,
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

  const existingItem = await db.select().from(region).where(eq(region.id, id));

  if (existingItem.length === 0) {
    return JSON.stringify(
      badRequestResponse({
        reason: 'validation error',
        message: `region with id ${id} does not exist`,
        path: ['id'],
      }),
    );
  }

  if (body.name && body.name !== existingItem[0].name) {
    const childExists = await db
      .select()
      .from(city)
      .where(eq(city.regionId, id))
      .limit(1);

    if (childExists.length > 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `name cannot be replaced for region with id ${id} because it has children and it would change the meaning`,
          path: ['name'],
        }),
      );
    }
  }

  return null;
};

export default customUpdateRegionCheck;
