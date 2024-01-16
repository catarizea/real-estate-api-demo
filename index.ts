import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';

import { homeRoutes, propertyRoutes } from '@/routes';

const app = new OpenAPIHono();

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

app.route('/', homeRoutes);
app.route('/properties', propertyRoutes);

app.get(
  '/ui',
  swaggerUI({
    url: '/doc',
  }),
);

app.doc('/doc', {
  info: {
    title: 'Real Estate API Demo',
    version: 'v1',
  },
  openapi: '3.1.0',
});

export default app;
