import { apiVersion } from '@/constants';

import city from './city';
import community from './community';
import {
  buildingFeatureToProperty,
  communityFeatureToCommunity,
  featureToProperty,
} from './featureToItem';
import floorPlan from './floorPlan';
import home from './home';
import media from './media';
import mediaType from './mediaType';
import {
  bathroom,
  bedroom,
  buildingFeature,
  communityFeature,
  feature,
  typeProp,
} from './nomenclature';
import parking from './parking';
import property from './property';
import region from './region';
import search from './search';
import unit from './unit';

const routes = [
  {
    path: `/${apiVersion}/`,
    routes: home,
  },
  {
    path: `/${apiVersion}/search`,
    routes: search,
  },
  {
    path: `/${apiVersion}/bathroom`,
    routes: bathroom,
  },
  {
    path: `/${apiVersion}/bedroom`,
    routes: bedroom,
  },
  {
    path: `/${apiVersion}/building-feature`,
    routes: buildingFeature,
  },
  {
    path: `/${apiVersion}/building-feature-to-property`,
    routes: buildingFeatureToProperty,
  },
  {
    path: `/${apiVersion}/city`,
    routes: city,
  },
  {
    path: `/${apiVersion}/community`,
    routes: community,
  },
  {
    path: `/${apiVersion}/community-feature`,
    routes: communityFeature,
  },
  {
    path: `/${apiVersion}/community-feature-to-community`,
    routes: communityFeatureToCommunity,
  },
  {
    path: `/${apiVersion}/feature`,
    routes: feature,
  },
  {
    path: `/${apiVersion}/feature-to-property`,
    routes: featureToProperty,
  },
  {
    path: `/${apiVersion}/floor-plan`,
    routes: floorPlan,
  },
  {
    path: `/${apiVersion}/media`,
    routes: media,
  },
  {
    path: `/${apiVersion}/media-type`,
    routes: mediaType,
  },
  {
    path: `/${apiVersion}/parking`,
    routes: parking,
  },
  {
    path: `/${apiVersion}/property`,
    routes: property,
  },
  {
    path: `/${apiVersion}/region`,
    routes: region,
  },
  {
    path: `/${apiVersion}/type-prop`,
    routes: typeProp,
  },
  {
    path: `/${apiVersion}/unit`,
    routes: unit,
  },
];

export default routes;
