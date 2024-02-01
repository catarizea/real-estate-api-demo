import { postListBathroom } from '@/routes/bathroom';
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
  {
    path: '/bathroom',
    route: postListBathroom,
  },
];

export default routes;
