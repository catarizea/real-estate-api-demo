import { bathroom, bathroomUnitRelations } from './schemas/bathroom';
import { bedroom, bedroomUnitRelations } from './schemas/bedroom';
import {
  buildingFeature,
  buildingFeaturePropertyRelations,
  buildingFeatureToProperty,
  buildingFeatureToPropertyRelations,
} from './schemas/buildingFeature';
import {
  city,
  cityCommunityRelations,
  cityPropertyRelations,
  cityRegionRelations,
} from './schemas/city';
import {
  community,
  communityCityRelations,
  communityCommunityFeatureRelations,
  communityPropertyRelations,
} from './schemas/community';
import {
  communityFeature,
  communityFeatureCommunityRelations,
  communityFeatureToCommunity,
  communityFeatureToCommunityRelations,
} from './schemas/communityFeature';
import {
  feature,
  featurePropertyRelations,
  featureToProperty,
  featureToPropertyRelations,
} from './schemas/feature';
import {
  floorPlan,
  floorPlanPropertyRelations,
  floorPlanUnitRelations,
} from './schemas/floorPlan';
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
  propertyBuildingFeatureRelations,
  propertyCityRelations,
  propertyCommunityRelations,
  propertyFeatureRelations,
  propertyFloorPlanRelations,
  propertyMediaRelations,
  propertyParkingRelations,
  propertyTypeRelations,
  propertyUnitRelations,
} from './schemas/property';
import { region, regionCityRelations } from './schemas/region';
import { seedAddress } from './schemas/seedAddress';
import { typeProp, typePropPropertyRelations } from './schemas/typeProp';
import {
  unit,
  unitBathroomRelations,
  unitBedroomRelations,
  unitFloorPlanRelations,
  unitPropertyRelations,
} from './schemas/unit';
import { allView, propertyView, searchView, unitView } from './schemas/views';

export {
  allView,
  bathroom,
  bathroomUnitRelations,
  bedroom,
  bedroomUnitRelations,
  buildingFeature,
  buildingFeaturePropertyRelations,
  buildingFeatureToProperty,
  buildingFeatureToPropertyRelations,
  city,
  cityCommunityRelations,
  cityPropertyRelations,
  cityRegionRelations,
  community,
  communityCityRelations,
  communityCommunityFeatureRelations,
  communityFeature,
  communityFeatureCommunityRelations,
  communityFeatureToCommunity,
  communityFeatureToCommunityRelations,
  communityPropertyRelations,
  feature,
  featurePropertyRelations,
  featureToProperty,
  featureToPropertyRelations,
  floorPlan,
  floorPlanPropertyRelations,
  floorPlanUnitRelations,
  media,
  mediaMediaTypeRelations,
  mediaPropertyRelations,
  mediaType,
  mediaTypeMediaRelations,
  parking,
  parkingPropertyRelations,
  property,
  propertyBuildingFeatureRelations,
  propertyCityRelations,
  propertyCommunityRelations,
  propertyFeatureRelations,
  propertyFloorPlanRelations,
  propertyMediaRelations,
  propertyParkingRelations,
  propertyTypeRelations,
  propertyUnitRelations,
  propertyView,
  region,
  regionCityRelations,
  searchView,
  seedAddress,
  typeProp,
  typePropPropertyRelations,
  unit,
  unitBathroomRelations,
  unitBedroomRelations,
  unitFloorPlanRelations,
  unitPropertyRelations,
  unitView,
};
