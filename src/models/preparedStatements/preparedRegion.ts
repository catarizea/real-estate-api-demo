import { sql } from 'drizzle-orm';

import { db } from '@/models';

const preparedRegion = db.query.region
  .findFirst({
    columns: {
      id: true,
      name: true,
      administrativeName: true,
    },
    where: (region, { eq }) => eq(region.id, sql.placeholder('id')),
    with: {
      cities: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  })
  .prepare();

export default preparedRegion;
