import { CronJob } from 'cron';
import { gt } from 'drizzle-orm';
import path from 'path';

import { index } from '@/algolia';
import { algoliaSeedPrefix } from '@/constants';
import { db } from '@/models';
import { searchView } from '@/models/schema';
import { logger } from '@/services';
import { AlgoliaPropertyUnit, Cursor } from '@/types';
import { BatchAlgoliaUpdater } from '@/utils';

import cursorAglolia from './cursor.json';

const timezone = process.env.SERVER_TIMEZONE;
const batchSize = 500;

const file = path.join(
  process.cwd(),
  'src',
  'utils',
  'db',
  'seed',
  'algolia',
  'cursor.json',
);

const setCursor = async (cursor: Cursor): Promise<void> => {
  cursorAglolia.cursor = cursor.cursor;
  cursorAglolia.hasMore = cursor.hasMore;
  await Bun.write(file, JSON.stringify(cursorAglolia, null, 2));
};

const loadAlgolia = async (): Promise<void> => {
  if (!cursorAglolia.hasMore) {
    logger.info(
      `${algoliaSeedPrefix} Algolia property unit objects already loaded`,
    );
    process.exit(0);
  }

  const items = cursorAglolia.cursor
    ? await db
        .select()
        .from(searchView)
        .where(gt(searchView.id, cursorAglolia.cursor))
        .orderBy(searchView.id)
        .limit(batchSize)
    : await db
        .select()
        .from(searchView)
        .orderBy(searchView.id)
        .limit(batchSize);

  if (!items) {
    logger.error(`${algoliaSeedPrefix} No property units found`);
    process.exit(1);
  }

  if (!items.length) {
    logger.info(
      `${algoliaSeedPrefix} Algolia property unit objects already loaded`,
    );
    process.exit(0);
  }

  if (items.length < batchSize && items[items.length - 1].id) {
    await setCursor({
      cursor: items[items.length - 1].id as string,
      hasMore: false,
    });
  } else {
    await setCursor({
      cursor: items[items.length - 1].id as string,
      hasMore: true,
    });
  }

  const batchAlgoliaUpdater = new BatchAlgoliaUpdater<AlgoliaPropertyUnit>(
    index,
    batchSize,
  );

  items.forEach((item) => {
    const newItem: AlgoliaPropertyUnit = {
      objectID: item.id as string,
      propertyId: item.propertyId as string,
      rent: item.rent as number,
      immediate: item.immediate as number,
      shortterm: item.shortterm as number,
      longterm: item.longterm as number,
      furnished: item.furnished as number,
      heat: item.heat as number,
      water: item.water as number,
      electricity: item.electricity as number,
      internet: item.internet as number,
      television: item.television as number,
      bedroom: item.bedroom as string,
      bathroom: item.bathroom as string,
      listingId: item.listingId as number,
      address: item.address as string,
      community: item.community as string,
      type: item.type as string,
      smoking: item.smoking as number,
      cats: item.cats as number,
      dogs: item.dogs as number,
      latitude: parseFloat(item.latitude as string),
      longitude: parseFloat(item.longitude as string),
      imageId: item.imageId as string,
    };

    if (item.availableDate) {
      newItem.availableDate = item.availableDate;
    }

    if (item.parking) {
      newItem.parking = item.parking.split('|');
    }

    if (item.feature) {
      newItem.feature = item.feature.split('|');
    }

    batchAlgoliaUpdater.load(newItem);
  });

  await batchAlgoliaUpdater.execute();

  logger.info(
    `${algoliaSeedPrefix} Algolia property unit objects batch of ${batchSize} items loaded`,
  );
};

const job = new CronJob('0 * * * * *', loadAlgolia, null, false, timezone);

job.start();
