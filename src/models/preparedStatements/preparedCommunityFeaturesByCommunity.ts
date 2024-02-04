import { sql } from 'drizzle-orm';

import { db } from '@/models';

const preparedCommunityFeaturesByCommunity =
  db.query.communityFeatureToCommunity
    .findMany({
      columns: {
        communityFeatureId: true,
      },
      where: (community, { eq }) =>
        eq(community.communityId, sql.placeholder('communityId')),
      with: {
        communityFeature: {
          columns: {
            name: true,
          },
        },
      },
    })
    .prepare();

export default preparedCommunityFeaturesByCommunity;
