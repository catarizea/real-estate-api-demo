import bathroom from './bathroom';
import home from './home';
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
];

export default routes;
