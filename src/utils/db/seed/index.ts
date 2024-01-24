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
import {
  bathrooms,
  bedrooms,
  buildingFeatures,
  communityFeatures,
  features,
  typeProps,
} from '@/utils/db/taxonomy';

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

const featureIds = await load(feature, features, 'property unit features');

const typePropIds = await load(typeProp, typeProps, 'property types');

logger.info(`${prefix} success db seed`);

process.exit(0);
