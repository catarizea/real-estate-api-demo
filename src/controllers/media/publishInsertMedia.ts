import { tasks } from '@/constants';
import { checkPublished } from '@/controllers';
import { preparedImagesByPropertyId } from '@/models/preparedStatements';
import { media } from '@/models/schema';
import { messagePublisher } from '@/services';
import { CommonInsertItemSchema } from '@/types';

const publishInsertMedia: (
  newId: string,
  newValues: CommonInsertItemSchema,
) => Promise<void> = async (newId, newValues) => {
  const { propertyId, assetId } = newValues as typeof media.$inferInsert;

  const medias = await preparedImagesByPropertyId.execute({ propertyId });

  if (medias.length === 0 || medias[0].id !== newId) {
    return;
  }

  const publishedUnit = await checkPublished(propertyId);

  if (!publishedUnit || publishedUnit.length === 0) {
    return;
  }

  messagePublisher({
    type: tasks.media.create,
    payload: {
      imageId: assetId,
      unitIds: publishedUnit.map((u) => u.id),
    },
  });
};

export default publishInsertMedia;
