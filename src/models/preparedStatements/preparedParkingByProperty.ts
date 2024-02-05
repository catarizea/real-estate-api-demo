import { sql } from 'drizzle-orm';

import { db } from '@/models';

const preparedParkingByProperty = db.query.parking
  .findMany({
    columns: {
      id: true,
      name: true,
      fee: true,
      feeInterval: true,
      order: true,
    },
    where: (parking, { eq }) =>
      eq(parking.propertyId, sql.placeholder('propertyId')),
    orderBy: (parking, { asc }) => [asc(parking.order)],
  })
  .prepare();

export default preparedParkingByProperty;
