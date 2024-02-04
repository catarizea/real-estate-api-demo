import { sql } from 'drizzle-orm';

import { db } from '@/models';

const preparedBuildingFeaturesByProperty = db.query.buildingFeatureToProperty
  .findMany({
    columns: {
      buildingFeatureId: true,
    },
    where: (buildingFeatureToProperty, { eq }) =>
      eq(buildingFeatureToProperty.propertyId, sql.placeholder('propertyId')),
    with: {
      buildingFeature: {
        columns: {
          name: true,
        },
      },
    },
  })
  .prepare();

export default preparedBuildingFeaturesByProperty;
