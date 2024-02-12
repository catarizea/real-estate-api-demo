import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { media, mediaType, property } from '@/models/schema';
import { InsertMediaSchema, UpdateMediaSchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customInsertMediaCheck = async (
  body: InsertMediaSchema | UpdateMediaSchema,
  id?: string,
) => {
  let mediaExists: (typeof media.$inferSelect)[] | null = null;

  if (id) {
    mediaExists = await db
      .select()
      .from(media)
      .where(eq(media.id, id))
      .limit(1);
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
