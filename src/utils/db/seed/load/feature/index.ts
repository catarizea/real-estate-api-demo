import { gt } from 'drizzle-orm';

import { dbSeedPrefix } from '@/constants';
import { db } from '@/models';
import { feature, featureToProperty, property } from '@/models/schema';
import { logger } from '@/services';
import { Cursor, CursorArgs } from '@/types';
import { BatchWriter } from '@/utils';
import { getRandomFeatures } from '@/utils/db/seed/distribution';

const batchSize = 100;

type NewFeatureToProperty = {
  featureId: string;
  propertyId: string;
};

type Args = {
  cursor: Cursor;
  setCursor: ({ cursor, hasMore }: CursorArgs) => void;
};

const loadFeature = async ({ cursor, setCursor }: Args): Promise<void> => {
  if (!cursor.hasMore) {
    logger.info(`${dbSeedPrefix} properties already loaded`);
    return;
  }

  const featureIds = await db
    .select({ id: feature.id })
    .from(feature)
    .orderBy(feature.order);

  if (!featureIds || !featureIds.length) {
    logger.error(`${dbSeedPrefix} No building features found`);
    process.exit(1);
  }

  const featIds = featureIds.map((f) => f.id);

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

  if (propertyIds.length < batchSize) {
    setCursor({
      cursor: propertyIds[propertyIds.length - 1].id,
      hasMore: false,
      type: 'feature',
    });
  } else {
    setCursor({
      cursor: propertyIds[propertyIds.length - 1].id,
      hasMore: true,
      type: 'feature',
    });
  }

  const batchWriter = new BatchWriter<
    typeof featureToProperty,
    NewFeatureToProperty
  >({ model: featureToProperty, batchSize: 20 });

  propertyIds.forEach((propertyId) => {
    const fIds = getRandomFeatures(featIds, 6);

    fIds.forEach((fId) => {
      batchWriter.load({ featureId: fId, propertyId: propertyId.id });
    });
  });

  await batchWriter.execute();

  logger.info(
    `${dbSeedPrefix} property features batch of ${batchSize} items loaded`,
  );
};

export default loadFeature;
