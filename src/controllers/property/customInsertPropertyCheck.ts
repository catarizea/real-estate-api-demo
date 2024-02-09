import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { city, community, typeProp } from '@/models/schema';
import {
  InsertPropertySchema,
  UpdatePropertySchema,
} from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customInsertPropertyCheck = async (
  body: InsertPropertySchema | UpdatePropertySchema,
) => {
  if (body.typePropId) {
    const typePropExists = await db
      .select()
      .from(typeProp)
      .where(eq(typeProp.id, body.typePropId))
      .limit(1);

    if (typePropExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `typeProp with id ${body.typePropId} does not exist`,
          path: ['typePropId'],
        }),
      );
    }
  }

  if (body.communityId) {
    const communityExists = await db
      .select()
      .from(community)
      .where(eq(community.id, body.communityId))
      .limit(1);

    if (communityExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `community with id ${body.communityId} does not exist`,
          path: ['communityId'],
        }),
      );
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

  return null;
};

export default customInsertPropertyCheck;
