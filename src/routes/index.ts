import community from './community';
import {
  buildingFeatureToProperty,
  communityFeatureToCommunity,
  featureToProperty,
} from './featureToItem';
import home from './home';
import {
  bathroom,
  bedroom,
  communityFeature,
  feature,
  typeProp,
} from './nomenclature';
import parking from './parking';
import property from './property';
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
    path: '/community',
    routes: community,
  },
  {
    path: '/community-feature',
    routes: communityFeature,
  },
  {
    path: '/feature',
    routes: feature,
  },
  {
    path: '/type-prop',
    routes: typeProp,
  },
  {
    path: '/feature-to-property',
    routes: featureToProperty,
  },
  {
    path: '/community-feature-to-community',
    routes: communityFeatureToCommunity,
  },
  {
    path: '/building-feature-to-property',
    routes: buildingFeatureToProperty,
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
    path: '/unit',
    routes: unit,
  },
];

export default routes;
