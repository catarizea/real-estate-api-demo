import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { media, mediaType, property } from '@/models/schema';
import { InsertMediaSchema, UpdateMediaSchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customInsertMediaCheck = async (
  body: InsertMediaSchema | UpdateMediaSchema,
  id?: string,
) => {
  let mediaExists: { propertyId: string; mediaTypeId: string }[] | null = null;

  if (id) {
    const exists = await db
      .select({ mediaTypeId: media.mediaTypeId, propertyId: media.propertyId })
      .from(media)
      .where(eq(media.id, id));

    if (exists.length > 0) {
      mediaExists = exists;
    }
  }

  if (body.mediaTypeId) {
    const mediaTypeExists = await db
      .select()
      .from(mediaType)
      .where(eq(mediaType.id, body.mediaTypeId))
      .limit(1);

    if (mediaTypeExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `mediaType with id ${body.mediaTypeId} does not exist`,
          path: ['name'],
        }),
      );
    }

    if (
      mediaExists &&
      mediaExists.length > 0 &&
      mediaExists[0].mediaTypeId !== body.mediaTypeId
    ) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `mediaTypeId ${body.mediaTypeId} cannot replace existing mediaTypeId for media with id ${id}`,
          path: ['mediaTypeId'],
        }),
      );
    }
  }

  if (body.propertyId) {
    const propertyExists = await db
      .select()
      .from(property)
      .where(eq(property.id, body.propertyId))
      .limit(1);

    if (propertyExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `property with id ${body.propertyId} does not exist`,
          path: ['propertyId'],
        }),
      );
    }

    if (
      mediaExists &&
      mediaExists.length > 0 &&
      mediaExists[0].propertyId !== body.propertyId
    ) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `propertyId ${body.propertyId} cannot replace existing propertyId for media with id ${id}`,
          path: ['propertyId'],
        }),
      );
    }
  }

  return null;
};

export default customInsertMediaCheck;
