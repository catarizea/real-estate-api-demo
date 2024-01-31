import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';

import { httpLogger } from '@/middlewares';
import routes from '@/routes';

const app = new OpenAPIHono();

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

app.use('*', httpLogger);

routes.forEach(({ path, route }) => {
  app.route(path, route);
});

export default app;
