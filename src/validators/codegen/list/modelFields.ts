import { ModelFields } from '@/types';

const modelFields: ModelFields = {
  city: {
    id: ['id', 'regionId'],
    numeric: [],
    string: ['name'],
    datetime: ['createdAt', 'updatedAt'],
    tinyInt: [],
    dateOnly: [],
    decimal: ['latitude', 'longitude'],
  },
  community: {
    id: ['id', 'cityId'],
    numeric: [
      'score',
      'population',
      'dwellings',
      'averageIncome',
      'elevation',
      'established',
    ],
    string: ['name', 'imageUrl', 'quadrant', 'sector', 'ward'],
    dateOnly: [],
    datetime: ['createdAt', 'updatedAt'],
    tinyInt: [],
    decimal: [
      'latitude',
      'longitude',
      'area',
      'usedForRenting',
      'density',
      'lowIncome',
      'immigrants',
    ],
  },
  foorPlan: {
    id: ['id', 'propertyId'],
    numeric: ['order'],
    string: ['name'],
    datetime: ['createdAt', 'updatedAt'],
    tinyInt: [],
    dateOnly: [],
    decimal: [],
  },
  media: {
    id: ['id', 'propertyId'],
    numeric: ['order'],
    string: ['assetId'],
    datetime: ['createdAt', 'updatedAt'],
    tinyInt: [],
    dateOnly: [],
    decimal: [],
  },
  mediaType: {
    id: ['id'],
    numeric: [],
    string: ['name'],
    datetime: ['createdAt', 'updatedAt'],
    tinyInt: [],
    dateOnly: [],
    decimal: [],
  },
  nomenclature: {
    id: ['id'],
    numeric: ['order'],
    string: ['name'],
    datetime: ['createdAt', 'updatedAt'],
    tinyInt: [],
    dateOnly: [],
    decimal: [],
  },
  parking: {
    id: ['id', 'propertyId'],
    numeric: ['order', 'fee'],
    string: ['name', 'feeInterval'],
    datetime: ['createdAt', 'updatedAt'],
    tinyInt: [],
    dateOnly: [],
    decimal: [],
  },
  property: {
    id: ['id', 'typeId', 'communityId', 'cityId'],
    numeric: ['listingId', 'yearBuilt', 'petsFee', 'customerRanking'],
    string: ['name', 'address', 'petsFeeInterval'],
    datetime: ['createdAt', 'updatedAt'],
    tinyInt: [
      'smoking',
      'cats',
      'dogs',
      'petsNegotiable',
      'published',
      'paidSearchRanking',
    ],
    dateOnly: [],
    decimal: ['latitude', 'longitude'],
  },
  region: {
    id: ['id'],
    numeric: [],
    string: ['name', 'administrativeName'],
    datetime: ['createdAt', 'updatedAt'],
    tinyInt: [],
    dateOnly: [],
    decimal: [],
  },
  unit: {
    id: ['id', 'propertyId', 'floorPlanId', 'bedroomId', 'bathroomId'],
    numeric: ['rent', 'order', 'deposit', 'surface'],
    string: ['name', 'unitNumber', 'unitName'],
    dateOnly: ['availableDate'],
    datetime: ['createdAt', 'updatedAt'],
    tinyInt: [
      'available',
      'immediate',
      'shortterm',
      'longterm',
      'furnished',
      'heat',
      'water',
      'electricity',
      'internet',
      'television',
      'published',
    ],
    decimal: [],
  },
};

export default modelFields;
