import { db } from '@/models';
import { communityFeatureToCommunity } from '@/models/schema';
import { logger } from '@/services';
import { getRandomFeatures } from '@/utils/db/seed/distribution';

const featuresToCommunity = async (
  communityFeatureIds: string[],
  communitiesIds: { [key: string]: string },
) => {
  for (const [, communityId] of Object.entries(communitiesIds)) {
    const features = getRandomFeatures(communityFeatureIds, 6);

    const values = features.map((featureId) => ({
      communityId,
      communityFeatureId: featureId,
    }));

    await db.insert(communityFeatureToCommunity).values(values);
  }

  logger.info(
    `[DB SEED] success community features loaded for all communities`,
  );
};

export default featuresToCommunity;
