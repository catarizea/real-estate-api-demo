import {
  bathroom,
  bedroom,
  buildingFeature,
  communityFeature,
  feature,
  typeProp,
} from '@/models/schema';
import { logger } from '@/services';
import load, { prefix } from '@/utils/db/seed/load';
import commIds from '@/utils/db/seed/load/communitiesIds';
import featuresToCommunity from '@/utils/db/seed/load/featuresToCommunities';
import {
  bathrooms,
  bedrooms,
  buildingFeatures,
  communityFeatures,
  features,
  typeProps,
} from '@/utils/db/taxonomy';

const communitiesIds = await commIds();

const bathroomIds = await load(bathroom, bathrooms, 'bathrooms types');

const bedroomIds = await load(bedroom, bedrooms, 'bedrooms types');

const buildingFeatureIds = await load(
  buildingFeature,
  buildingFeatures,
  'building features',
);

const communityFeatureIds = await load(
  communityFeature,
  communityFeatures,
  'community features',
);

if (!communityFeatureIds || !communityFeatureIds.length) {
  logger.error(`${prefix} community features loading error`);
  process.exit(1);
}

await featuresToCommunity(communityFeatureIds, communitiesIds);

const featureIds = await load(feature, features, 'property unit features');

const typePropIds = await load(typeProp, typeProps, 'property types');

logger.info(`${prefix} success db seed`);

process.exit(0);
