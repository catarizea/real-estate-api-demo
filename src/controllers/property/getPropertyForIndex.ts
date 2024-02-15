import { preparedPropertyForIndex } from '@/models/preparedStatements';
import { PropertyIndexFragment } from '@/types';
import { PreparedPropertyForIndexSchema } from '@/validators';

const getPropertyForIndex = async (
  id: string,
): Promise<PropertyIndexFragment | null> => {
  const property = await preparedPropertyForIndex.execute({ id });

  if (!property) {
    return null;
  }

  const p = property as PreparedPropertyForIndexSchema;

  const propertyForIndex: PropertyIndexFragment = {
    listingId: p.listingId,
    address: p.address,
    type: p.typeProp.name,
    _geoloc: {
      lat: parseFloat(p.latitude as string),
      lng: parseFloat(p.longitude as string),
    },
    smoking: p.smoking ? 1 : 0,
    cats: p.cats ? 1 : 0,
    dogs: p.dogs ? 1 : 0,
  };

  if (p.featureToProperty.length > 0) {
    const features = p.featureToProperty
      .map((f) => f?.feature.name)
      .filter((f) => f !== null) as string[];

    if (features.length > 0) {
      propertyForIndex.feature = features;
    }
  }

  if (p.community) {
    propertyForIndex.community = p.community.name;
  }

  if (p.medias && p.medias.length > 0) {
    const orderedMedias = p.medias.sort((a, b) => a.order - b.order);
    propertyForIndex.imageId = orderedMedias[0].assetId;
  }

  if (p.parkings.length > 0) {
    const parkings = p.parkings
      .map((p) => p?.name)
      .filter((p) => p !== null) as string[];

    if (parkings.length > 0) {
      propertyForIndex.parking = parkings;
    }
  }

  return propertyForIndex;
};

export default getPropertyForIndex;
