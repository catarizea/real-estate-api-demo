import { sql } from 'drizzle-orm';

import { db } from '@/models';

const preparedPropertyForIndex = db.query.property
  .findFirst({
    columns: {
      id: true,
      listingId: true,
      name: true,
      address: true,
      latitude: true,
      longitude: true,
      smoking: true,
      cats: true,
      dogs: true,
      published: true,
    },
    where: (property, { eq }) => eq(property.id, sql.placeholder('id')),
    with: {
      featureToProperty: {
        columns: {
          feature: true,
        },
        with: {
          feature: {
            columns: {
              name: true,
            },
          },
        },
      },
      community: {
        columns: {
          name: true,
        },
      },
      medias: {
        columns: {
          assetId: true,
          order: true,
        },
      },
      parkings: {
        columns: {
          name: true,
          order: true,
        },
      },
      typeProp: {
        columns: {
          name: true,
        },
      },
    },
  })
  .prepare();

export default preparedPropertyForIndex;
