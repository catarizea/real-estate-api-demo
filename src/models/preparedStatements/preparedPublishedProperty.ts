import { and, eq, sql } from 'drizzle-orm';

import { db } from '@/models';
import { property } from '@/models/schema';

const preparedPublishedProperty = db
  .select({ id: property.id })
  .from(property)
  .where(
    and(
      eq(property.id, sql.placeholder('propertyId')),
      eq(property.published, true),
    ),
  )
  .prepare();

export default preparedPublishedProperty;
