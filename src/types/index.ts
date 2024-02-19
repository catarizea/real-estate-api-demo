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
  InsertBathroomSchema,
  insertBathroomSchema,
  insertBathroomSchemaExample,
  InsertCitySchema,
  insertCitySchema,
  insertCitySchemaExample,
  InsertCommunitySchema,
  insertCommunitySchemaExample,
  InsertFloorPlanSchema,
  insertFloorPlanSchema,
  insertFloorPlanSchemaExample,
  InsertMediaSchema,
  insertMediaSchema,
  insertMediaSchemaExample,
  InsertMediaTypeSchema,
  insertMediaTypeSchema,
  insertMediaTypeSchemaExample,
  InsertParkingSchema,
  insertParkingSchema,
  insertParkingSchemaExample,
  InsertPropertySchema,
  insertPropertySchema,
  insertPropertySchemaExample,
  InsertRegionSchema,
  insertRegionSchema,
  insertRegionSchemaExample,
  InsertUnitSchema,
  insertUnitSchema,
  insertUnitSchemaExample,
  SelectBathroomSchema,
  selectBathroomSchema,
  SelectCitySchema,
  selectCitySchema,
  SelectCommunitySchema,
  selectCommunitySchema,
  SelectFloorPlanSchema,
  selectFloorPlanSchema,
  SelectMediaSchema,
  selectMediaSchema,
  SelectMediaTypeSchema,
  selectMediaTypeSchema,
  SelectParkingSchema,
  selectParkingSchema,
  SelectPropertySchema,
  selectPropertySchema,
  SelectUnitSchema,
  selectUnitSchema,
  UpdateBathroomSchema,
  updateBathroomSchema,
  updateBathroomSchemaExample,
  UpdateCitySchema,
  updateCitySchema,
  updateCitySchemaExample,
  updateCommunitySchema,
  updateCommunitySchemaExample,
  UpdateFloorPlanSchema,
  updateFloorPlanSchema,
  updateFloorPlanSchemaExample,
  UpdateMediaSchema,
  updateMediaSchema,
  updateMediaSchemaExample,
  UpdateMediaTypeSchema,
  updateMediaTypeSchema,
  updateMediaTypeSchemaExample,
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
  bodyCityListSchema,
  bodyCommunityListSchema,
  bodyCommunityListSchemaExample,
  bodyFloorPlanListSchema,
  bodyMediaListSchema,
  bodyMediaTypeListSchema,
  bodyNomenclatureListSchema,
  bodyNomenclatureListSchemaExample,
  bodyParkingListSchema,
  bodyPropertyListSchema,
  bodyRegionListSchema,
  bodyUnitListSchema,
  buildingFeatureToPropertySuccessSchema,
  cityBodySchemaExample,
  CityListSchema,
  communityFeatureToPropertySuccessSchema,
  CommunityListSchema,
  featureToPropertySuccessSchema,
  floorPlanBodySchemaExample,
  FloorPlanListSchema,
  mediaBodySchemaExample,
  MediaListSchema,
  MediaTypeListSchema,
  NomenclatureListSchema,
  paginationCityOrderSchema,
  paginationCommunityOrderSchema,
  paginationFloorPlanOrderSchema,
  paginationMediaOrderSchema,
  paginationMediaTypeOrderSchema,
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
  community?: string;
  type: string;
  smoking: number;
  cats: number;
  dogs: number;
  imageId?: string;
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

export type PropertyIndexFragment = {
  listingId: number;
  address: string;
  type: string;
  _geoloc: {
    lat: number;
    lng: number;
  };
  smoking: number;
  cats: number;
  dogs: number;
  feature?: string[];
  parking?: string[];
  imageId?: string;
  community?: string;
};

export type UnitIndexFragment = {
  objectID: string;
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
  bedroom?: string;
  bathroom?: string;
};

export type UnitUpdateIndexFragment = {
  objectID: string;
  rent?: number;
  immediate?: number;
  availableDate?: Date;
  shortterm?: number;
  longterm?: number;
  furnished?: number;
  heat?: number;
  water?: number;
  electricity?: number;
  internet?: number;
  television?: number;
  bedroom?: string;
  bathroom?: string;
};

export type MediaPayload = {
  imageId: string;
  unitIds: string[];
};

export type ParkingPayload = {
  parking: string[];
  unitIds: string[];
};

export type UnitsPayload = {
  units: (PropertyIndexFragment & UnitIndexFragment)[];
};

export type PropertyPartialPayload = {
  property: PartialUpdatePropertySchema;
  unitIds: string[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KeyedObject = { [key: string]: any };

export type PartialUpdatePropertySchema = Omit<
  UpdatePropertySchema,
  'updatedAt' | 'published'
> &
  KeyedObject;

export type PartialSelectPropertySchema = Omit<
  SelectPropertySchema,
  'createdAt' | 'updatedAt' | 'published'
> &
  KeyedObject;

export type PartialUpdateUnitSchema = Omit<
  UpdateUnitSchema,
  'updatedAt' | 'published'
> &
  KeyedObject;

export type PartialSelectUnitSchema = Omit<
  SelectUnitSchema,
  'createdAt' | 'updatedAt' | 'published'
> &
  KeyedObject;

export type FeatureToItemPayload = {
  features: string[];
  unitIds: string[];
};

export type RabbitMqMessage = {
  type: string;
  payload:
    | { id: string }
    | { unitIds: string[] }
    | { newUnit: PropertyIndexFragment & UnitIndexFragment }
    | { unit: UnitUpdateIndexFragment }
    | MediaPayload
    | ParkingPayload
    | PropertyPartialPayload
    | UnitsPayload
    | FeatureToItemPayload;
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
  MediaType = 'mediaType',
  BuildingFeature = 'buildingFeature',
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

export type CommonInsertItemSchema =
  | InsertParkingSchema
  | InsertBathroomSchema
  | InsertPropertySchema
  | InsertCommunitySchema
  | InsertUnitSchema
  | InsertRegionSchema
  | InsertCitySchema
  | InsertMediaTypeSchema
  | InsertMediaSchema
  | InsertFloorPlanSchema;

export type CommonInsertSchema =
  | typeof insertParkingSchema
  | typeof insertBathroomSchema
  | typeof insertPropertySchema
  | typeof insertCommunitySchema
  | typeof insertUnitSchema
  | typeof insertRegionSchema
  | typeof insertCitySchema
  | typeof insertMediaTypeSchema
  | typeof insertMediaSchema
  | typeof insertFloorPlanSchema;

export type CommonInsertSchemaExample =
  | typeof insertParkingSchemaExample
  | typeof insertBathroomSchemaExample
  | typeof insertPropertySchemaExample
  | typeof insertCommunitySchemaExample
  | typeof insertUnitSchemaExample
  | typeof insertRegionSchemaExample
  | typeof insertCitySchemaExample
  | typeof insertMediaTypeSchemaExample
  | typeof insertMediaSchemaExample
  | typeof insertFloorPlanSchemaExample;

export type CommonUpdateSchema =
  | typeof updateParkingSchema
  | typeof updateBathroomSchema
  | typeof updatePropertySchema
  | typeof updateCommunitySchema
  | typeof updateUnitSchema
  | typeof updateRegionSchema
  | typeof updateCitySchema
  | typeof updateMediaTypeSchema
  | typeof updateMediaSchema
  | typeof updateFloorPlanSchema;

export type CommonUpdateSchemaExample =
  | typeof updateParkingSchemaExample
  | typeof updateBathroomSchemaExample
  | typeof updatePropertySchemaExample
  | typeof updateCommunitySchemaExample
  | typeof updateUnitSchemaExample
  | typeof updateRegionSchemaExample
  | typeof updateCitySchemaExample
  | typeof updateMediaTypeSchemaExample
  | typeof updateMediaSchemaExample
  | typeof updateFloorPlanSchemaExample;

export type CommonSelectItemSchema =
  | typeof selectParkingSchema
  | typeof selectBathroomSchema
  | typeof selectPropertySchema
  | typeof selectCommunitySchema
  | typeof selectUnitSchema
  | typeof selectRegionSchema
  | typeof selectCitySchema
  | typeof selectMediaTypeSchema
  | typeof selectMediaSchema
  | typeof selectFloorPlanSchema;

export type CommonSelectItemSchemaType =
  | SelectParkingSchema
  | SelectPropertySchema
  | SelectBathroomSchema
  | SelectCommunitySchema
  | SelectUnitSchema
  | SelectRegionSchema
  | SelectCitySchema
  | SelectMediaTypeSchema
  | SelectMediaSchema
  | SelectFloorPlanSchema;

export type CommonUpdateItemSchema =
  | UpdateParkingSchema
  | UpdatePropertySchema
  | UpdateBathroomSchema
  | UpdateCommunitySchema
  | UpdateUnitSchema
  | UpdateRegionSchema
  | UpdateCitySchema
  | UpdateMediaTypeSchema
  | UpdateMediaSchema
  | UpdateFloorPlanSchema;

export type CommonPaginationOrderSchema =
  | typeof paginationParkingOrderSchema
  | typeof paginationNomenclatureOrderSchema
  | typeof paginationPropertyOrderSchema
  | typeof paginationCommunityOrderSchema
  | typeof paginationUnitOrderSchema
  | typeof paginationRegionOrderSchema
  | typeof paginationCityOrderSchema
  | typeof paginationMediaTypeOrderSchema
  | typeof paginationMediaOrderSchema
  | typeof paginationFloorPlanOrderSchema;

export type CommonItemListSchema =
  | ParkingListSchema
  | PropertyListSchema
  | NomenclatureListSchema
  | CommunityListSchema
  | UnitListSchema
  | RegionListSchema
  | CityListSchema
  | MediaListSchema
  | MediaTypeListSchema
  | FloorPlanListSchema;

export type CommonBodyItemListSchema =
  | typeof bodyParkingListSchema
  | typeof bodyNomenclatureListSchema
  | typeof bodyPropertyListSchema
  | typeof bodyCommunityListSchema
  | typeof bodyUnitListSchema
  | typeof bodyRegionListSchema
  | typeof bodyCityListSchema
  | typeof bodyMediaTypeListSchema
  | typeof bodyMediaListSchema
  | typeof bodyFloorPlanListSchema;

export type CommonBodyItemListSchemaExample =
  | typeof parkingBodySchemaExample
  | typeof propertyBodySchemaExample
  | typeof bodyNomenclatureListSchemaExample
  | typeof bodyCommunityListSchemaExample
  | typeof unitBodySchemaExample
  | typeof regionBodySchemaExample
  | typeof cityBodySchemaExample
  | typeof bodyMediaTypeListSchema
  | typeof mediaBodySchemaExample
  | typeof floorPlanBodySchemaExample;

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
  | typeof region
  | typeof city
  | typeof mediaType
  | typeof media
  | typeof floorPlan;

export type CommonChildrenModel =
  | typeof unit
  | typeof communityFeatureToCommunity
  | typeof featureToProperty
  | typeof property
  | typeof floorPlan
  | typeof parking
  | typeof media
  | typeof buildingFeatureToProperty
  | typeof city
  | typeof community
  | typeof media;

export type CommonChild = {
  model: CommonChildrenModel;
  tag: NomenclatureTag;
  parentIdField: string;
};
