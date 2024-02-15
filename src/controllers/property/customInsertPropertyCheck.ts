import { and, eq } from 'drizzle-orm';

import { db } from '@/models';
import { city, community, property, typeProp } from '@/models/schema';
import {
  InsertPropertySchema,
  UpdatePropertySchema,
} from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customInsertPropertyCheck = async (
  body: InsertPropertySchema | UpdatePropertySchema,
  id?: string,
) => {
  if (body.typePropId) {
    const typePropExists = await db
      .select({ id: typeProp.id })
      .from(typeProp)
      .where(eq(typeProp.id, body.typePropId));

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

  if (body.communityId && !body.cityId) {
    const communityExists = await db
      .select({ cityId: community.cityId })
      .from(community)
      .where(eq(community.id, body.communityId));

    if (communityExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `community with id ${body.communityId} does not exist`,
          path: ['communityId'],
        }),
      );
    }

    if (!id) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `required`,
          path: ['cityId'],
        }),
      );
    }

    const propertyExists = await db
      .select({ cityId: property.cityId })
      .from(property)
      .where(eq(property.id, id));

    if (
      propertyExists &&
      propertyExists.length &&
      propertyExists[0].cityId !== communityExists[0].cityId
    ) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `community with id ${body.communityId} does not exist in city with id ${propertyExists[0].cityId}`,
          path: ['communityId'],
        }),
      );
    }
  }

  if (body.cityId && !body.communityId) {
    const cityExists = await db
      .select({ id: city.id })
      .from(city)
      .where(eq(city.id, body.cityId));

    if (cityExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `city with id ${body.cityId} does not exist`,
          path: ['cityId'],
        }),
      );
    }

    if (!id) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `required`,
          path: ['communityId'],
        }),
      );
    }

    const propertyExists = await db
      .select({ cityId: property.cityId })
      .from(property)
      .where(eq(property.id, id));

    if (
      propertyExists &&
      propertyExists.length &&
      propertyExists[0].cityId !== cityExists[0].id
    ) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `city with id ${body.cityId} cannot replace existing cityId from property with id ${id} without replacing communityId as well`,
          path: ['cityId', 'communityId'],
        }),
      );
    }
  }

  if (body.communityId && body.cityId) {
    const cityExists = await db
      .select({ id: city.id })
      .from(city)
      .where(eq(city.id, body.cityId));

    if (cityExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `city with id ${body.cityId} does not exist`,
          path: ['cityId'],
        }),
      );
    }

    const communityExists = await db
      .select({ id: community.id })
      .from(community)
      .where(
        and(
          eq(community.id, body.communityId),
          eq(community.cityId, body.cityId),
        ),
      );

    if (communityExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `community with id ${body.communityId} does not exist in city with id ${body.cityId}`,
          path: ['communityId'],
        }),
      );
    }
  }

  return null;
};

export default customInsertPropertyCheck;
