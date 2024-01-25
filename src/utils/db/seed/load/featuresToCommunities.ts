import { db } from '@/models';
import { communityFeatureToCommunity } from '@/models/schema';
import { logger } from '@/services';
import { getRandomFeatures } from '@/utils/db/seed/distribution';

const batchSize = 20;

const featuresToCommunity = async (
  communityFeatureIds: string[],
  communitiesIds: { [key: string]: string },
) => {
  let batch: { communityId: string; communityFeatureId: string }[] = [];

  for (const [, communityId] of Object.entries(communitiesIds)) {
    const features = getRandomFeatures(communityFeatureIds, 6);

    const values = features.map((featureId) => ({
      communityId,
      communityFeatureId: featureId,
    }));

    if (batch.length < batchSize) {
      batch = [...batch, ...values];
    } else {
      await db.insert(communityFeatureToCommunity).values(batch);
      batch = [];
      batch = [...batch, ...values];
    }
  }

  if (batch.length) {
    await db.insert(communityFeatureToCommunity).values(batch);
  }

  logger.info(
    `[DB SEED] success community features loaded for all communities`,
  );
};

export default featuresToCommunity;
