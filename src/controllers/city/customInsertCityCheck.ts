import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { region } from '@/models/schema';
import { InsertCitySchema, UpdateCitySchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customInsertCityCheck = async (
  body: InsertCitySchema | UpdateCitySchema,
) => {
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

  return null;
};

export default customInsertCityCheck;
