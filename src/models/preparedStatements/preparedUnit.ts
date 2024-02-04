import { sql } from 'drizzle-orm';

import { db } from '@/models';

const preparedUnit = db.query.unit
  .findFirst({
    columns: {
      id: true,
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
    where: (unit, { eq }) => eq(unit.id, sql.placeholder('id')),
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

export default preparedUnit;
