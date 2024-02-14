import { tasks } from '@/constants';
import { checkPublished } from '@/controllers';
import { preparedImagesByPropertyId } from '@/models/preparedStatements';
import { SelectMediaSchema, UpdateMediaSchema } from '@/models/zodSchemas';
import { messagePublisher } from '@/services';
import { CommonSelectItemSchemaType, CommonUpdateItemSchema } from '@/types';

const publishUpdateMedia: (
  id: string,
  newValues: CommonUpdateItemSchema & { updatedAt: Date },
  oldValues: CommonSelectItemSchemaType,
) => Promise<void> = async (id, newValues, oldValues) => {
  const { order: newOrder, assetId: newAssetId } =
    newValues as UpdateMediaSchema;
  const {
    order: oldOrder,
    assetId: oldAssetId,
    propertyId,
  } = oldValues as SelectMediaSchema;

  if (
    (!newOrder && !newAssetId) ||
    (newOrder && newOrder >= oldOrder) ||
    (!newOrder && newAssetId && newAssetId === oldAssetId)
  ) {
    return;
  }

  const medias = await preparedImagesByPropertyId.execute({ propertyId });

  if (medias.length === 0 || medias[0].id !== id) {
    return;
  }

  const publishedUnit = await checkPublished(propertyId);

  if (!publishedUnit || publishedUnit.length === 0) {
    return;
  }

  messagePublisher({
    type: tasks.media.update,
    payload: {
      imageId: newAssetId || oldAssetId,
      unitIds: publishedUnit.map((u) => u.id),
    },
  });
};

export default publishUpdateMedia;
