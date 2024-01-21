import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';

import { httpLogger } from '@/middlewares';
import { homeRoutes, propertyRoutes } from '@/routes';

const app = new OpenAPIHono();

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

app.use('*', httpLogger);

app.route('/', homeRoutes);
app.route('/properties', propertyRoutes);

export default app;
