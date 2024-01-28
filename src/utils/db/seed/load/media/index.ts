import { eq, gt } from 'drizzle-orm';

import { dbSeedPrefix } from '@/constants';
import { db } from '@/models';
import { media, mediaType, property } from '@/models/schema';
import { logger } from '@/services';
import { Cursor, CursorArgs, NewPropertyMedia } from '@/types';
import { BatchWriter } from '@/utils';

import getPexelsImages from './getPexelsImages';

const batchSize = 80;

type Args = {
  cursor: Cursor;
  setCursor: ({ cursor, hasMore, iteration, type }: CursorArgs) => void;
};

const loadMedia = async ({ cursor, setCursor }: Args): Promise<void> => {
  if (!cursor.hasMore) {
    logger.info(`${dbSeedPrefix} media already loaded`);
    return;
  }

  if (typeof cursor.iteration === 'undefined') {
    logger.error(`${dbSeedPrefix} media cursor iteration is undefined`);
    process.exit(1);
  }

  const mediaTypes = await db
    .select({ id: mediaType.id })
    .from(mediaType)
    .where(eq(mediaType.name, 'image'));

  if (!mediaTypes || !mediaTypes.length) {
    logger.error(`${dbSeedPrefix} No media types found`);
    process.exit(1);
  }

  const mediaTypeId = mediaTypes[0].id;

  const propertyIds = cursor.cursor
    ? await db
        .select({ id: property.id })
        .from(property)
        .where(gt(property.id, cursor.cursor))
        .orderBy(property.id)
        .limit(batchSize)
    : await db
        .select({ id: property.id })
        .from(property)
        .orderBy(property.id)
        .limit(batchSize);

  const pexelsImages = await getPexelsImages({
    query: 'apartment',
    perPage: batchSize,
    page: cursor.iteration + 1,
  });

  if (!pexelsImages || !pexelsImages.length) {
    logger.error(`${dbSeedPrefix} Cannot get images form Pexels`);
    process.exit(1);
  }

  if (propertyIds.length < batchSize) {
    setCursor({
      cursor: propertyIds[propertyIds.length - 1].id,
      hasMore: false,
      type: 'media',
      iteration: cursor.iteration + 1,
    });
  } else {
    setCursor({
      cursor: propertyIds[propertyIds.length - 1].id,
      hasMore: true,
      type: 'media',
      iteration: cursor.iteration + 1,
    });
  }

  const batchWriter = new BatchWriter<typeof media, NewPropertyMedia>({
    model: media,
    batchSize: 20,
  });

  propertyIds.forEach((p, index) => {
    const newPropertyMedia = {
      propertyId: p.id,
      mediaTypeId,
      url: pexelsImages[index],
      order: 0,
    };

    batchWriter.load(newPropertyMedia);
  });

  await batchWriter.execute();

  logger.info(
    `${dbSeedPrefix} property media batch of ${batchSize} items loaded`,
  );
};

export default loadMedia;
