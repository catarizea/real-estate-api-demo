import { logger } from '@/services';
import {
  bathroomsLoad,
  bedroomsLoad,
  buildingFeaturesLoad,
  communityFeaturesLoad,
} from '@/utils/db/seed/load';

const prefix = '[DB SEED]';

const fail = (message: string): void => {
  logger.error(`${prefix} ${message}`);
  process.exit(1);
};

const bathroomIds = await bathroomsLoad();

if (!bathroomIds || !bathroomIds.length) {
  fail('loading bathrooms error');
}

logger.info(`${prefix} bathrooms loaded: ${bathroomIds.length} items`);

const bedroomIds = await bedroomsLoad();

if (!bedroomIds || !bedroomIds.length) {
  fail('loading bedrooms error');
}

logger.info(`${prefix} bedrooms loaded: ${bedroomIds.length} items`);

const buildingFeatureIds = await buildingFeaturesLoad();

if (!buildingFeatureIds || !buildingFeatureIds.length) {
  fail('loading building features error');
}

logger.info(
  `${prefix} building features loaded: ${buildingFeatureIds.length} items`,
);

const communityFeatureIds = await communityFeaturesLoad();

if (!communityFeatureIds || !communityFeatureIds.length) {
  fail('loading community features error');
}

logger.info(
  `${prefix} community features loaded: ${communityFeatureIds.length} items`,
);

logger.info(`${prefix} success db seed`);

process.exit(0);
