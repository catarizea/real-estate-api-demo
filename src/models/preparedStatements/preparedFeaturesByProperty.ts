import { sql } from 'drizzle-orm';

import { db } from '@/models';

const preparedFeaturesByProperty = db.query.featureToProperty
  .findMany({
    columns: {
      featureId: true,
    },
    where: (featureToProperty, { eq }) =>
      eq(featureToProperty.propertyId, sql.placeholder('propertyId')),
    with: {
      feature: {
        columns: {
          name: true,
        },
      },
    },
  })
  .prepare();

export default preparedFeaturesByProperty;
