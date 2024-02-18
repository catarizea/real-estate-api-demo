import { db } from '@/models';
import { communityFeatureToCommunity } from '@/models/schema';
import { badRequestResponse } from '@/utils';
import { FeatureToItemSchema } from '@/validators';

const createCommunityFeatureToCommunity = async (body: FeatureToItemSchema) => {
  const validCommunityFeature = await db.query.communityFeature.findFirst({
    where: (communityFeature, { eq }) =>
      eq(communityFeature.id, body.featureId),
  });

  if (!validCommunityFeature) {
    return badRequestResponse({
      reason: 'validation error',
      message: `communityFeature with id ${body.featureId} does not exist`,
      path: ['featureId'],
    });
  }

  const validCommunity = await db.query.community.findFirst({
    where: (community, { eq }) => eq(community.id, body.itemId),
  });

  if (!validCommunity) {
    return badRequestResponse({
      reason: 'validation error',
      message: `community with id ${body.itemId} does not exist`,
      path: ['itemId'],
    });
  }

  const alreadyExists = await db.query.communityFeatureToCommunity.findFirst({
    where: (communityFeatureToCommunity, { and, eq }) =>
      and(
        eq(communityFeatureToCommunity.communityFeatureId, body.featureId),
        eq(communityFeatureToCommunity.communityId, body.itemId),
      ),
  });

  if (alreadyExists) {
    return badRequestResponse({
      reason: 'validation error',
      message: `communityFeature with id ${body.featureId} already exists for community with id ${body.itemId}`,
      path: ['featureId', 'itemId'],
    });
  }

  await db.insert(communityFeatureToCommunity).values({
    communityFeatureId: body.featureId,
    communityId: body.itemId,
  });
};

export default createCommunityFeatureToCommunity;
