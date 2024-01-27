import { CronJob } from 'cron';
import path from 'path';

import { dbSeedPrefix } from '@/constants';
import {
  bathroom,
  bedroom,
  buildingFeature,
  communityFeature,
  feature,
  typeProp,
} from '@/models/schema';
import { logger } from '@/services';
import { CursorArgs } from '@/types';
import {
  commIds,
  cursorBuildingFeature,
  cursorFeature,
  cursorMedia,
  cursorProperty,
  featuresToCommunity,
  load,
  loadBuildingFeature,
  loaded,
  loadFeature,
  loadProperty,
} from '@/utils/db/seed/load';
import {
  bathrooms,
  bedrooms,
  buildingFeatures,
  communityFeatures,
  features,
  typeProps,
} from '@/utils/db/taxonomy';

const timezone = process.env.SERVER_TIMEZONE;

const rootFolder = path.join(
  process.cwd(),
  'src',
  'utils',
  'db',
  'seed',
  'load',
);

const setCursor = async ({ cursor, hasMore, type }: CursorArgs) => {
  switch (type) {
    case 'buildingFeature':
      cursorBuildingFeature.cursor = cursor;
      cursorBuildingFeature.hasMore = hasMore;
      break;
    case 'feature':
      cursorFeature.cursor = cursor;
      cursorFeature.hasMore = hasMore;
      break;
    case 'media':
      cursorMedia.cursor = cursor;
      cursorMedia.hasMore = hasMore;
      break;
    case 'property':
      cursorProperty.cursor = cursor;
      cursorProperty.hasMore = hasMore;
      break;
  }

  const file = path.join(rootFolder, type, 'cursor.json');
  await Bun.write(file, JSON.stringify({ cursor, hasMore }, null, 2));
};

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

  if (cursorProperty.hasMore) {
    await loadProperty({ cursor: cursorProperty, setCursor, communitiesIds });
    return;
  } else {
    logger.info(`${dbSeedPrefix} properties already loaded`);
  }

  if (cursorBuildingFeature.hasMore) {
    await loadBuildingFeature({ cursor: cursorBuildingFeature, setCursor });
    return;
  } else {
    logger.info(`${dbSeedPrefix} building features already loaded`);
  }

  if (cursorFeature.hasMore) {
    await loadFeature({ cursor: cursorFeature, setCursor });
    return;
  } else {
    logger.info(`${dbSeedPrefix} property features already loaded`);
  }

  logger.info(`${dbSeedPrefix} success db seed finished`);

  process.exit(0);
};

const job = new CronJob('0 * * * * *', task, null, false, timezone);

job.start();
