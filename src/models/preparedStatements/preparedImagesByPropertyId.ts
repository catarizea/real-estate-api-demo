import { and, eq, sql } from 'drizzle-orm';

import { db } from '@/models';
import { media, mediaType } from '@/models/schema';
import { insertMediaTypeSchemaExample } from '@/models/zodSchemas';

let whereClause = and(
  eq(media.propertyId, sql.placeholder('propertyId')),
  eq(mediaType.name, 'image'),
);

if (process.env.BUN_ENV && process.env.BUN_ENV === 'algolia') {
  whereClause = and(
    eq(media.propertyId, sql.placeholder('propertyId')),
    eq(mediaType.name, insertMediaTypeSchemaExample.name),
  );
}

const preparedImagesByPropertyId = db
  .select({ id: media.id, assetId: media.assetId })
  .from(media)
  .innerJoin(mediaType, eq(media.mediaTypeId, mediaType.id))
  .where(whereClause)
  .orderBy(media.order)
  .prepare();

export default preparedImagesByPropertyId;
