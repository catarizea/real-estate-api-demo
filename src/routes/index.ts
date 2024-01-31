import { getHome } from '@/routes/home';
import { postSearch } from '@/routes/search';

const routes = [
  {
    path: '/',
    route: getHome,
  },
  {
    path: '/search',
    route: postSearch,
  },
];

export default routes;
