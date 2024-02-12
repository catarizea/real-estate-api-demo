import type { Entry } from 'node-geocoder';

import {
  bathroom,
  bedroom,
  buildingFeature,
  buildingFeatureToProperty,
  city,
  community,
  communityFeature,
  communityFeatureToCommunity,
  feature,
  featureToProperty,
  floorPlan,
  media,
  mediaType,
  parking,
  property,
  region,
  typeProp,
  unit,
} from '@/models/schema';
import {
  insertBathroomSchema,
  insertBathroomSchemaExample,
  insertCommunitySchemaExample,
  insertParkingSchema,
  insertParkingSchemaExample,
  insertPropertySchema,
  insertPropertySchemaExample,
  insertRegionSchema,
  insertRegionSchemaExample,
  insertUnitSchema,
  insertUnitSchemaExample,
  SelectBathroomSchema,
  selectBathroomSchema,
  SelectCommunitySchema,
  selectCommunitySchema,
  SelectParkingSchema,
  selectParkingSchema,
  SelectPropertySchema,
  selectPropertySchema,
  SelectUnitSchema,
  selectUnitSchema,
  UpdateBathroomSchema,
  updateBathroomSchema,
  updateBathroomSchemaExample,
  updateCommunitySchema,
  updateCommunitySchemaExample,
  UpdateParkingSchema,
  updateParkingSchema,
  updateParkingSchemaExample,
  UpdatePropertySchema,
  updatePropertySchema,
  updatePropertySchemaExample,
  updateRegionSchema,
  UpdateUnitSchema,
  updateUnitSchema,
  updateUnitSchemaExample,
} from '@/models/zodSchemas';
import {
  insertCommunitySchema,
  UpdateCommunitySchema,
} from '@/models/zodSchemas/community';
import {
  SelectRegionSchema,
  selectRegionSchema,
  UpdateRegionSchema,
  updateRegionSchemaExample,
} from '@/models/zodSchemas/region';
import {
  bodyCommunityListSchema,
  bodyCommunityListSchemaExample,
  bodyNomenclatureListSchema,
  bodyNomenclatureListSchemaExample,
  bodyParkingListSchema,
  bodyPropertyListSchema,
  bodyRegionListSchema,
  bodyUnitListSchema,
  buildingFeatureToPropertySuccessSchema,
  communityFeatureToPropertySuccessSchema,
  CommunityListSchema,
  featureToPropertySuccessSchema,
  NomenclatureListSchema,
  paginationCommunityOrderSchema,
  paginationNomenclatureOrderSchema,
  paginationParkingOrderSchema,
  paginationPropertyOrderSchema,
  paginationRegionOrderSchema,
  paginationUnitOrderSchema,
  parkingBodySchemaExample,
  ParkingListSchema,
  propertyBodySchemaExample,
  PropertyListSchema,
  regionBodySchemaExample,
  RegionListSchema,
  unitBodySchemaExample,
  UnitListSchema,
} from '@/validators';

export type Point = {
  latitude: number;
  longitude: number;
};

export type Address = Entry & {
  extra: {
    googlePlaceId?: string;
    confidence?: number;
    premise?: string | null;
    subpremise?: string | null;
    neighborhood?: string | null;
    establishment?: string | null;
  };
};

export type Cursor = {
  cursor: string;
  hasMore: boolean;
  iteration?: number;
};

export type CursorArgs = Cursor & {
  type: 'buildingFeature' | 'feature' | 'media' | 'property';
};

export type NewProperty = {
  id: string;
  name: string;
  descriptionTitle: string;
  descriptionSubtitle: string;
  descriptionText: string;
  yearBuilt: number;
  address: string;
  latitude: string;
  longitude: string;
  typePropId: string;
  cityId: string;
  communityId: string;
  smoking: boolean;
  cats: boolean;
  dogs: boolean;
  petsNegotiable?: boolean;
  petsFee?: number;
  petsFeeInterval?: string;
  paidSearchRanking: boolean;
  published: boolean;
};

export type NewFloorPlan = {
  id: string;
  name: string;
  propertyId: string;
  order: number;
};

export type NewUnit = {
  id: string;
  name: string;
  propertyId: string;
  floorPlanId: string;
  rent: number;
  deposit: number;
  shortterm: boolean;
  longterm: boolean;
  unitNumber?: string;
  surface: number;
  furnished: boolean;
  bedroomId: string;
  bathroomId: string;
  heat: boolean;
  water: boolean;
  electricity: boolean;
  internet: boolean;
  television: boolean;
  order: number;
  published: boolean;
};

export type NewParking = {
  id: string;
  name: string;
  propertyId: string;
  fee: number;
  feeInterval: string;
  order: number;
};

export type NewBuildingFeatureToProperty = {
  buildingFeatureId: string;
  propertyId: string;
};

export type NewFeatureToProperty = {
  featureId: string;
  propertyId: string;
};

export type NewPropertyMedia = {
  propertyId: string;
  mediaTypeId: string;
  assetId: string;
  order: number;
};

type CommonPropertyUnit = {
  propertyId: string;
  rent: number;
  immediate: number;
  availableDate?: Date;
  shortterm: number;
  longterm: number;
  furnished: number;
  heat: number;
  water: number;
  electricity: number;
  internet: number;
  television: number;
  bedroom: string;
  bathroom: string;
  listingId: number;
  address: string;
  community: string;
  type: string;
  smoking: number;
  cats: number;
  dogs: number;
  imageId: string;
};

export type SearchPropertyUnit = CommonPropertyUnit & {
  id: string;
  latitude: string;
  longitude: string;
  parking?: string;
  feature?: string;
};

export type AlgoliaPropertyUnit = CommonPropertyUnit & {
  objectID: string;
  _geoloc: {
    lat: number;
    lng: number;
  };
  parking?: string[];
  feature?: string[];
};

export type RabbitMqMessage = {
  type: string;
  payload: {
    id: string;
  };
};

export enum NomenclatureTag {
  Bathroom = 'bathroom',
  Bedroom = 'bedroom',
  CommunityFeature = 'communityFeature',
  Feature = 'feature',
  TypeProp = 'typeProp',
  Unit = 'unit',
  CommunityFeatureToCommunity = 'communityFeatureToCommunity',
  FeatureToProperty = 'featureToProperty',
  Property = 'property',
  BuildingFeatureToProperty = 'buildingFeatureToProperty',
  Parking = 'parking',
  Home = 'home',
  Search = 'search',
  FloorPlan = 'floorPlan',
  Media = 'media',
  Community = 'community',
  Region = 'region',
  City = 'city',
}

export type FeatureToItem =
  | typeof featureToProperty
  | typeof communityFeatureToCommunity
  | typeof buildingFeatureToProperty;

export type FeatureToItemSuccessSchema =
  | typeof featureToPropertySuccessSchema
  | typeof buildingFeatureToPropertySuccessSchema
  | typeof communityFeatureToPropertySuccessSchema;

export type ModelField = {
  id: string[];
  numeric: string[];
  string: string[];
  datetime: string[];
  tinyInt: string[];
  dateOnly: string[];
  decimal: string[];
};

export type ModelFields = {
  [key: string]: ModelField;
};

export type CommonInsertSchema =
  | typeof insertParkingSchema
  | typeof insertBathroomSchema
  | typeof insertPropertySchema
  | typeof insertCommunitySchema
  | typeof insertUnitSchema
  | typeof insertRegionSchema;

export type CommonInsertSchemaExample =
  | typeof insertParkingSchemaExample
  | typeof insertBathroomSchemaExample
  | typeof insertPropertySchemaExample
  | typeof insertCommunitySchemaExample
  | typeof insertUnitSchemaExample
  | typeof insertRegionSchemaExample;

export type CommonUpdateSchema =
  | typeof updateParkingSchema
  | typeof updateBathroomSchema
  | typeof updatePropertySchema
  | typeof updateCommunitySchema
  | typeof updateUnitSchema
  | typeof updateRegionSchema;

export type CommonUpdateSchemaExample =
  | typeof updateParkingSchemaExample
  | typeof updateBathroomSchemaExample
  | typeof updatePropertySchemaExample
  | typeof updateCommunitySchemaExample
  | typeof updateUnitSchemaExample
  | typeof updateRegionSchemaExample;

export type CommonSelectItemSchema =
  | typeof selectParkingSchema
  | typeof selectBathroomSchema
  | typeof selectPropertySchema
  | typeof selectCommunitySchema
  | typeof selectUnitSchema
  | typeof selectRegionSchema;

export type CommonSelectItemSchemaType =
  | SelectParkingSchema
  | SelectPropertySchema
  | SelectBathroomSchema
  | SelectCommunitySchema
  | SelectUnitSchema
  | SelectRegionSchema;

export type CommonUpdateItemSchema =
  | UpdateParkingSchema
  | UpdatePropertySchema
  | UpdateBathroomSchema
  | UpdateCommunitySchema
  | UpdateUnitSchema
  | UpdateRegionSchema;

export type CommonPaginationOrderSchema =
  | typeof paginationParkingOrderSchema
  | typeof paginationNomenclatureOrderSchema
  | typeof paginationPropertyOrderSchema
  | typeof paginationCommunityOrderSchema
  | typeof paginationUnitOrderSchema
  | typeof paginationRegionOrderSchema;

export type CommonItemListSchema =
  | ParkingListSchema
  | PropertyListSchema
  | NomenclatureListSchema
  | CommunityListSchema
  | UnitListSchema
  | RegionListSchema;

export type CommonBodyItemListSchema =
  | typeof bodyParkingListSchema
  | typeof bodyNomenclatureListSchema
  | typeof bodyPropertyListSchema
  | typeof bodyCommunityListSchema
  | typeof bodyUnitListSchema
  | typeof bodyRegionListSchema;

export type CommonBodyItemListSchemaExample =
  | typeof parkingBodySchemaExample
  | typeof propertyBodySchemaExample
  | typeof bodyNomenclatureListSchemaExample
  | typeof bodyCommunityListSchemaExample
  | typeof unitBodySchemaExample
  | typeof regionBodySchemaExample;

export type CommonModel =
  | typeof parking
  | typeof bathroom
  | typeof bedroom
  | typeof buildingFeature
  | typeof feature
  | typeof communityFeature
  | typeof typeProp
  | typeof property
  | typeof community
  | typeof unit
  | typeof region;

export type CommonChildrenModel =
  | typeof unit
  | typeof communityFeatureToCommunity
  | typeof featureToProperty
  | typeof property
  | typeof floorPlan
  | typeof parking
  | typeof media
  | typeof buildingFeatureToProperty
  | typeof city;

export type CommonChild = {
  model: CommonChildrenModel;
  tag: NomenclatureTag;
  parentIdField: string;
};
