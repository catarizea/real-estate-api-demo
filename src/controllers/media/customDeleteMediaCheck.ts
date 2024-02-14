import {
  preparedImagesByPropertyId,
  preparedPublishedProperty,
} from '@/models/preparedStatements';
import { SelectMediaSchema } from '@/models/zodSchemas';
import { CommonSelectItemSchemaType } from '@/types';
import { badRequestResponse } from '@/utils';

const customDeleteMediaCheck = async (
  existingItem: CommonSelectItemSchemaType,
): Promise<string | null> => {
  const { id, propertyId } = existingItem as SelectMediaSchema;

  const medias = await preparedImagesByPropertyId.execute({ propertyId });

  const publishedProperty = await preparedPublishedProperty.execute({
    propertyId,
  });

  if (medias.length === 1 && publishedProperty.length) {
    return JSON.stringify(
      badRequestResponse({
        reason: 'validation error',
        message: `media with id ${id} cannot be deleted because it is the only media for published property with id ${propertyId}`,
        path: ['id'],
      }),
    );
  }

  return null;
};

export default customDeleteMediaCheck;
