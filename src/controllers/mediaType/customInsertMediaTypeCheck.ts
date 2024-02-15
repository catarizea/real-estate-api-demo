import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { mediaType } from '@/models/schema';
import {
  InsertMediaTypeSchema,
  UpdateMediaTypeSchema,
} from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customInsertMediaTypeCheck = async (
  body: InsertMediaTypeSchema | UpdateMediaTypeSchema,
) => {
  if (body.name) {
    const mediaTypeExists = await db
      .select({ id: mediaType.id })
      .from(mediaType)
      .where(eq(mediaType.name, body.name.trim()))
      .limit(1);

    if (mediaTypeExists.length > 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `mediaType with name ${body.name} already exists`,
          path: ['name'],
        }),
      );
    }
  }

  return null;
};

export default customInsertMediaTypeCheck;
