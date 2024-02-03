import home from './home';
import {
  bathroom,
  bedroom,
  communityFeature,
  feature,
  typeProp,
} from './nomenclature';
import search from './search';

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
];

export default routes;
