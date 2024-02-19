import { sql } from 'drizzle-orm';

import { db } from '@/models';

const preparedSingleUnitForIndex = db.query.unit
  .findFirst({
    columns: {
      id: true,
      propertyId: true,
      rent: true,
      immediate: true,
      availableDate: true,
      shortterm: true,
      longterm: true,
      furnished: true,
      heat: true,
      water: true,
      electricity: true,
      internet: true,
      television: true,
    },
    where: (unit, { eq, and }) =>
      and(eq(unit.id, sql.placeholder('id')), eq(unit.published, true)),
    with: {
      bedroom: {
        columns: {
          name: true,
        },
      },
      bathroom: {
        columns: {
          name: true,
        },
      },
    },
  })
  .prepare();

export default preparedSingleUnitForIndex;
