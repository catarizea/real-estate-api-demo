import { and, eq, sql } from 'drizzle-orm';

import { db } from '@/models';
import { unit } from '@/models/schema';

const preparedPublishedUnit = db
  .select({ id: unit.id })
  .from(unit)
  .where(
    and(
      eq(unit.propertyId, sql.placeholder('propertyId')),
      eq(unit.published, true),
    ),
  )
  .prepare();

export default preparedPublishedUnit;
