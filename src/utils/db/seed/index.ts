import { CronJob } from 'cron';
import path from 'path';

import { dbSeedPrefix, timezone } from '@/constants';
import {
  bathroom,
  bedroom,
  buildingFeature,
  communityFeature,
  feature,
  typeProp,
} from '@/models/schema';
import { logger } from '@/services';
import {
  commIds,
  featuresToCommunity,
  load,
  loaded,
} from '@/utils/db/seed/load';
import {
  bathrooms,
  bedrooms,
  buildingFeatures,
  communityFeatures,
  features,
  typeProps,
} from '@/utils/db/taxonomy';

const rootFolder = path.join(
  process.cwd(),
  'src',
  'utils',
  'db',
  'seed',
  'load',
);

const communitiesIds = await commIds();

const task = async () => {
  if (!loaded.loaded) {
    await load(bathroom, bathrooms, 'bathrooms types');

    await load(bedroom, bedrooms, 'bedrooms types');

    await load(buildingFeature, buildingFeatures, 'building features');

    const communityFeatureIds = await load(
      communityFeature,
      communityFeatures,
      'community features',
    );

    if (!communityFeatureIds || !communityFeatureIds.length) {
      logger.error(`${dbSeedPrefix} community features loading error`);
      process.exit(1);
    }

    await featuresToCommunity(communityFeatureIds, communitiesIds);

    await load(feature, features, 'property unit features');

    await load(typeProp, typeProps, 'property types');

    loaded.loaded = true;

    await Bun.write(
      path.join(rootFolder, 'rest', 'loaded.json'),
      JSON.stringify(loaded, null, 2),
    );

    logger.info(`${dbSeedPrefix} success all taxonomies loaded`);

    return;
  }

  logger.info(`${dbSeedPrefix} taxonomies already loaded`);

  logger.info(`${dbSeedPrefix} success db seed finished`);

  process.exit(0);
};

const job = new CronJob('0 * * * * *', task, null, false, timezone);

job.start();
