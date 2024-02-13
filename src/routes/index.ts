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
    path: '/',
    routes: home,
  },
  {
    path: '/search',
    routes: search,
  },
  {
    path: '/bathroom',
    routes: bathroom,
  },
  {
    path: '/bedroom',
    routes: bedroom,
  },
  {
    path: '/building-feature-to-property',
    routes: buildingFeatureToProperty,
  },
  {
    path: '/city',
    routes: city,
  },
  {
    path: '/community',
    routes: community,
  },
  {
    path: '/community-feature',
    routes: communityFeature,
  },
  {
    path: '/community-feature-to-community',
    routes: communityFeatureToCommunity,
  },
  {
    path: '/feature',
    routes: feature,
  },
  {
    path: '/feature-to-property',
    routes: featureToProperty,
  },
  {
    path: '/floor-plan',
    routes: floorPlan,
  },
  {
    path: '/media',
    routes: media,
  },
  {
    path: '/media-type',
    routes: mediaType,
  },
  {
    path: '/parking',
    routes: parking,
  },
  {
    path: '/property',
    routes: property,
  },
  {
    path: '/region',
    routes: region,
  },
  {
    path: '/type-prop',
    routes: typeProp,
  },
  {
    path: '/unit',
    routes: unit,
  },
];

export default routes;
