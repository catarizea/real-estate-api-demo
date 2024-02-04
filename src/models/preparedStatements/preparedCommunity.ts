import { sql } from 'drizzle-orm';

import { db } from '@/models';

const preparedCommunity = db.query.community
  .findFirst({
    columns: {
      id: true,
      name: true,
      score: true,
      imageUrl: true,
      quadrant: true,
      sector: true,
      ward: true,
      population: true,
      dwellings: true,
      usedForRenting: true,
      area: true,
      density: true,
      averageIncome: true,
      lowIncome: true,
      immigrants: true,
      elevation: true,
      established: true,
      description: true,
      latitude: true,
      longitude: true,
    },
    where: (community, { eq }) => eq(community.id, sql.placeholder('id')),
    with: {
      city: {
        columns: {
          name: true,
        },
      },
      communityFeatureToCommunity: {
        columns: {
          communityFeature: true,
        },
        with: {
          communityFeature: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  })
  .prepare();

export default preparedCommunity;
