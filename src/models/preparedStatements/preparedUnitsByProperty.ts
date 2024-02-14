import { sql } from 'drizzle-orm';

import { db } from '@/models';

const preparedUnitsByProperty = db.query.unit
  .findMany({
    columns: {
      id: true,
      propertyId: true,
      floorPlanId: true,
      name: true,
      rent: true,
      deposit: true,
      available: true,
      immediate: true,
      availableDate: true,
      shortterm: true,
      longterm: true,
      unitNumber: true,
      unitName: true,
      surface: true,
      furnished: true,
      heat: true,
      water: true,
      electricity: true,
      internet: true,
      television: true,
      order: true,
      published: true,
    },
    where: (unit, { eq, and }) =>
      and(
        eq(unit.published, true),
        eq(unit.propertyId, sql.placeholder('propertyId')),
      ),
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

export default preparedUnitsByProperty;
