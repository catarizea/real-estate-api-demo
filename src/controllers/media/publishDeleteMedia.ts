import { tasks } from '@/constants';
import { checkPublished } from '@/controllers';
import { preparedImagesByPropertyId } from '@/models/preparedStatements';
import { SelectMediaSchema } from '@/models/zodSchemas';
import { messagePublisher } from '@/services';
import { CommonSelectItemSchemaType } from '@/types';

const publishDeleteMedia: (
  id: string,
  oldValues: CommonSelectItemSchemaType,
) => Promise<void> = async (_, oldValues) => {
  if (
    process.env.BUN_ENV &&
    ['test', 'postman'].includes(process.env.BUN_ENV)
  ) {
    return;
  }

  const { propertyId, order } = oldValues as SelectMediaSchema;

  const medias = (await preparedImagesByPropertyId.execute({
    propertyId,
  })) as SelectMediaSchema[];

  if (medias.length === 0 || medias[0].order < order) {
    return;
  }

  const publishedUnit = await checkPublished(propertyId);

  if (!publishedUnit || publishedUnit.length === 0) {
    return;
  }

  messagePublisher({
    type: tasks.media.delete,
    payload: {
      imageId: medias[0].assetId,
      unitIds: publishedUnit.map((u) => u.id),
    },
  });
};

export default publishDeleteMedia;
