import { gt } from 'drizzle-orm';

import { dbSeedPrefix } from '@/constants';
import { db } from '@/models';
import {
  buildingFeature,
  buildingFeatureToProperty,
  property,
} from '@/models/schema';
import { logger } from '@/services';
import { Cursor, CursorArgs } from '@/types';
import { BatchWriter } from '@/utils';
import { getRandomFeatures } from '@/utils/db/seed/distribution';

const batchSize = 100;

type NewBuildingFeatureToProperty = {
  buildingFeatureId: string;
  propertyId: string;
};

type Args = {
  cursor: Cursor;
  setCursor: ({ cursor, hasMore, type }: CursorArgs) => void;
};

const loadBuildingFeature = async ({
  cursor,
  setCursor,
}: Args): Promise<void> => {
  if (!cursor.hasMore) {
    logger.info(`${dbSeedPrefix} properties already loaded`);
    return;
  }

  const featureIds = await db
    .select({ id: buildingFeature.id })
    .from(buildingFeature)
    .orderBy(buildingFeature.order);

  if (!featureIds || !featureIds.length) {
    logger.error(`${dbSeedPrefix} No building features found`);
    process.exit(1);
  }

  const buildingFeatureIds = featureIds.map((f) => f.id);

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
      type: 'buildingFeature',
    });
  } else {
    setCursor({
      cursor: propertyIds[propertyIds.length - 1].id,
      hasMore: true,
      type: 'buildingFeature',
    });
  }

  const batchWriter = new BatchWriter<
    typeof buildingFeatureToProperty,
    NewBuildingFeatureToProperty
  >({ model: buildingFeatureToProperty, batchSize: 20 });

  propertyIds.forEach((propertyId) => {
    const fIds = getRandomFeatures(buildingFeatureIds, 4);

    fIds.forEach((fId) => {
      batchWriter.load({ buildingFeatureId: fId, propertyId: propertyId.id });
    });
  });

  await batchWriter.execute();

  logger.info(
    `${dbSeedPrefix} building features batch of ${batchSize} items loaded`,
  );
};

export default loadBuildingFeature;
