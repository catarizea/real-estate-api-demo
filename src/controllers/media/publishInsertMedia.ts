/* eslint-disable no-console */
import { and, eq } from 'drizzle-orm';

import { tasks } from '@/constants';
import { db } from '@/models';
import { preparedImagesByPropertyId } from '@/models/preparedStatements';
import { media, property, unit } from '@/models/schema';
import { messagePublisher } from '@/services';
import { CommonInsertItemSchema } from '@/types';

const publishInsertMedia = async (
  newId: string,
  newValues: CommonInsertItemSchema,
) => {
  console.log(`publish message for created media with id ${newId}`);
  console.log(JSON.stringify(newValues, null, 2));

  const { id, propertyId, assetId } = newValues as typeof media.$inferInsert;

  const medias = await preparedImagesByPropertyId.execute({ propertyId });

  if (medias.length === 0) {
    return;
  }

  if (medias[0].id !== id) {
    return;
  }

  const publishedProperty = await db
    .select({ id: property.id })
    .from(property)
    .where(and(eq(property.id, propertyId), eq(property.published, true)));

  if (publishedProperty.length === 0) {
    return;
  }

  const publishedUnit = await db
    .select({ id: unit.id })
    .from(unit)
    .where(and(eq(unit.propertyId, propertyId), eq(unit.published, true)));

  if (publishedUnit.length === 0) {
    return;
  }

  console.log('publish task to update index for property cover');

  const unitsToUpdateIndexFor = publishedUnit.map((u) => u.id);

  const message = {
    type: tasks.media.insert,
    payload: {
      imageId: assetId,
      unitIds: unitsToUpdateIndexFor,
    },
  };

  messagePublisher(message);
};

export default publishInsertMedia;
