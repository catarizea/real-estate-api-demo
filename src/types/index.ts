import type { Entry } from 'node-geocoder';

import {
  buildingFeatureToPropertyMapping,
  communityFeatureToCommunityMapping,
  featureToPropertyMapping,
} from '@/constants';
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
  insertParkingSchema,
  insertParkingSchemaExample,
  SelectParkingSchema,
  selectParkingSchema,
  updateParkingSchema,
  updateParkingSchemaExample,
} from '@/models/zodSchemas';
import {
  bodyParkingListSchema,
  buildingFeatureToPropertySuccessSchema,
  communityFeatureToPropertySuccessSchema,
  featureToPropertySuccessSchema,
  paginationParkingOrderSchema,
  parkingBodySchemaExample,
  ParkingListSchema,
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

export type NomenclatureModel =
  | typeof bathroom
  | typeof bedroom
  | typeof communityFeature
  | typeof feature
  | typeof typeProp;

export type NomenclatureChildrenModel =
  | typeof unit
  | typeof communityFeatureToCommunity
  | typeof featureToProperty
  | typeof property;

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
}

export type NomenclatureChild = {
  model: NomenclatureChildrenModel;
  tag: NomenclatureTag;
  parentIdField: string;
};

export type FeatureToItem =
  | typeof featureToProperty
  | typeof communityFeatureToCommunity
  | typeof buildingFeatureToProperty;

export type FeatureToItemSuccessSchema =
  | typeof featureToPropertySuccessSchema
  | typeof buildingFeatureToPropertySuccessSchema
  | typeof communityFeatureToPropertySuccessSchema;

export type FeatureToItemFieldsMapping =
  | typeof featureToPropertyMapping
  | typeof buildingFeatureToPropertyMapping
  | typeof communityFeatureToCommunityMapping;

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

export type CommonInsertSchema = typeof insertParkingSchema;

export type CommonInsertSchemaExample = typeof insertParkingSchemaExample;

export type CommonUpdateSchema = typeof updateParkingSchema;

export type CommonUpdateSchemaExample = typeof updateParkingSchemaExample;

export type CommonSelectItemSchema = typeof selectParkingSchema;

export type CommonSelectItemSchemaType = SelectParkingSchema;

export type CommonPaginationOrderSchema = typeof paginationParkingOrderSchema;

export type CommonItemListSchema = ParkingListSchema;

export type CommonBodyItemListSchema = typeof bodyParkingListSchema;

export type CommonBodyItemListSchemaExample = typeof parkingBodySchemaExample;

export type CommonModel = typeof parking;

/*
export type CommonModel =
  | typeof bathroom
  | typeof bedroom
  | typeof buildingFeature
  | typeof city
  | typeof community
  | typeof communityFeature
  | typeof feature
  | typeof floorPlan
  | typeof media
  | typeof mediaType
  | typeof parking
  | typeof property
  | typeof region
  | typeof typeProp
  | typeof unit;
*/

export type CommonChildrenModel =
  | typeof unit
  | typeof communityFeatureToCommunity
  | typeof featureToProperty
  | typeof property;

export type CommonChild = {
  model: CommonChildrenModel;
  tag: NomenclatureTag;
  parentIdField: string;
};
