import {
  preparedPublishedProperty,
  preparedPublishedUnit,
} from '@/models/preparedStatements';

const checkPublished: (
  propertyId: string,
) => Promise<{ id: string }[] | null> = async (propertyId) => {
  const publishedProperty = await preparedPublishedProperty.execute({
    propertyId,
  });

  if (publishedProperty.length === 0) {
    return null;
  }

  const publishedUnit = await preparedPublishedUnit.execute({ propertyId });

  if (publishedUnit.length === 0) {
    return null;
  }

  return publishedUnit;
};

export default checkPublished;
