import { bathroom, bathroomPropertyRelations } from './schemas/bathroom';
import { bedroom, bedroomPropertyRelations } from './schemas/bedroom';
import {
  city,
  cityCommunityRelations,
  cityPropertyRelations,
  cityRegionRelations,
} from './schemas/city';
import {
  community,
  communityCityRelations,
  communityPropertyRelations,
} from './schemas/community';
import {
  feature,
  featurePropertyRelations,
  featureToProperty,
  featureToPropertyRelations,
} from './schemas/feature';
import {
  media,
  mediaMediaTypeRelations,
  mediaPropertyRelations,
  mediaType,
  mediaTypeMediaRelations,
} from './schemas/media';
import { parking, parkingPropertyRelations } from './schemas/parking';
import {
  property,
  propertyBathroomRelations,
  propertyBedroomRelations,
  propertyCityRelations,
  propertyCommunityRelations,
  propertyFeatureRelations,
  propertyMediaRelations,
  propertyParkingRelations,
  propertyTypeRelations,
} from './schemas/property';
import { region, regionCityRelations } from './schemas/region';
import { typeProp, typePropPropertyRelations } from './schemas/typeProp';

export {
  bathroom,
  bathroomPropertyRelations,
  bedroom,
  bedroomPropertyRelations,
  city,
  cityCommunityRelations,
  cityPropertyRelations,
  cityRegionRelations,
  community,
  communityCityRelations,
  communityPropertyRelations,
  feature,
  featurePropertyRelations,
  featureToProperty,
  featureToPropertyRelations,
  media,
  mediaMediaTypeRelations,
  mediaPropertyRelations,
  mediaType,
  mediaTypeMediaRelations,
  parking,
  parkingPropertyRelations,
  property,
  propertyBathroomRelations,
  propertyBedroomRelations,
  propertyCityRelations,
  propertyCommunityRelations,
  propertyFeatureRelations,
  propertyMediaRelations,
  propertyParkingRelations,
  propertyTypeRelations,
  region,
  regionCityRelations,
  typeProp,
  typePropPropertyRelations,
};
