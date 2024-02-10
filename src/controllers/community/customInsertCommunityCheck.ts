import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { city } from '@/models/schema';
import {
  InsertCommunitySchema,
  UpdateCommunitySchema,
} from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customInsertCommunityCheck = async (
  body: InsertCommunitySchema | UpdateCommunitySchema,
) => {
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

  return null;
};

export default customInsertCommunityCheck;
