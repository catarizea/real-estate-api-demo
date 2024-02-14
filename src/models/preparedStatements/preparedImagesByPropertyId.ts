import { and, eq, sql } from 'drizzle-orm';

import { db } from '@/models';
import { media, mediaType } from '@/models/schema';

const preparedImagesByPropertyId = db
  .select({ id: media.id })
  .from(media)
  .innerJoin(mediaType, eq(media.mediaTypeId, mediaType.id))
  .where(
    and(
      eq(media.propertyId, sql.placeholder('propertyId')),
      eq(mediaType.name, 'image'),
    ),
  )
  .orderBy(media.order)
  .prepare();

export default preparedImagesByPropertyId;
