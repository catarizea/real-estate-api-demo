import { and, eq } from 'drizzle-orm';

import { db } from '@/models';
import { communityFeatureToCommunity } from '@/models/schema';
import { badRequestResponse } from '@/utils';

const deleteCommunityFeatureToCommunity = async (
  itemId: string,
  featureId: string,
) => {
  const communityExists = await db.query.community.findFirst({
    where: (community, { eq }) => eq(community.id, itemId),
  });

  if (!communityExists) {
    return badRequestResponse({
      reason: 'validation error',
      message: `community with id ${itemId} does not exist`,
      path: ['itemId'],
    });
  }

  const communityFeatureExists = await db.query.communityFeature.findFirst({
    where: (communityFeature, { eq }) => eq(communityFeature.id, featureId),
  });

  if (!communityFeatureExists) {
    return badRequestResponse({
      reason: 'validation error',
      message: `communityFeature with id ${featureId} does not exist`,
      path: ['featureId'],
    });
  }

  const result = await db
    .delete(communityFeatureToCommunity)
    .where(
      and(
        eq(communityFeatureToCommunity.communityId, itemId),
        eq(communityFeatureToCommunity.communityFeatureId, featureId),
      ),
    );

  if (result.rowsAffected === 0) {
    return badRequestResponse({
      reason: 'validation error',
      message: `communityFeature with id ${featureId} does not exist in community with id ${itemId}`,
      path: ['featureId', 'itemId'],
    });
  }
};

export default deleteCommunityFeatureToCommunity;
