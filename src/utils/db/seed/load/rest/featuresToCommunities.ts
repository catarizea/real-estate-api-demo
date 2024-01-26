import { communityFeatureToCommunity } from '@/models/schema';
import { logger } from '@/services';
import { BatchWriter } from '@/utils';
import { getRandomFeatures } from '@/utils/db/seed/distribution';

const featuresToCommunity = async (
  communityFeatureIds: string[],
  communitiesIds: { [key: string]: string },
) => {
  const batchWriter = new BatchWriter<
    typeof communityFeatureToCommunity,
    { communityId: string; communityFeatureId: string }
  >({ model: communityFeatureToCommunity, batchSize: 20 });

  for (const [, communityId] of Object.entries(communitiesIds)) {
    const features = getRandomFeatures(communityFeatureIds, 6);

    features.forEach(async (featureId) => {
      batchWriter.load({ communityId, communityFeatureId: featureId });
    });
  }

  await batchWriter.execute();

  logger.info(
    `[DB SEED] success community features loaded for all communities`,
  );
};

export default featuresToCommunity;
