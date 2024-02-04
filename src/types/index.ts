import type { Entry } from 'node-geocoder';

import {
  bathroom,
  bedroom,
  communityFeature,
  communityFeatureToCommunity,
  feature,
  featureToProperty,
  property,
  typeProp,
  unit,
} from '@/models/schema';

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
}

export type NomenclatureChild = {
  model: NomenclatureModel;
  tag: NomenclatureTag;
  parentIdField: string;
};
