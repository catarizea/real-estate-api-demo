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
import { Cursor, CursorArgs } from '@/types';
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
  loadMedia,
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
const seedBlocked = process.env.DATABASE_SEED_BLOCKED === 'true';

const rootFolder = path.join(
  process.cwd(),
  'src',
  'utils',
  'db',
  'seed',
  'load',
);

const setCursor = async ({ cursor, hasMore, type, iteration }: CursorArgs) => {
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
      if (typeof iteration !== 'undefined') {
        cursorMedia.cursor = cursor;
        cursorMedia.hasMore = hasMore;
        cursorMedia.iteration = iteration;
      }
      break;
    case 'property':
      cursorProperty.cursor = cursor;
      cursorProperty.hasMore = hasMore;
      break;
  }

  const file = path.join(rootFolder, type, 'cursor.json');
  const newCursor: Cursor = { cursor, hasMore };

  if (typeof iteration !== 'undefined') {
    newCursor.iteration = iteration;
  }

  await Bun.write(file, JSON.stringify(newCursor, null, 2));
};

const communitiesIds = await commIds();

const task = async () => {
  if (seedBlocked) {
    logger.error(
      `${dbSeedPrefix} database seed is blocked from the environment variables`,
    );
    process.exit(1);
  }

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

  if (cursorMedia.hasMore) {
    await loadMedia({ cursor: cursorMedia, setCursor });
    return;
  } else {
    logger.info(`${dbSeedPrefix} property media already loaded`);
  }

  logger.info(`${dbSeedPrefix} success db seed finished`);

  process.exit(0);
};

const job = new CronJob('0 * * * * *', task, null, false, timezone);

job.start();
