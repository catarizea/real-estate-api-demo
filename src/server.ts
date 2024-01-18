import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { homeRoutes, propertyRoutes } from '@/routes';

const app = new OpenAPIHono();

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

if (process.env.BUN_ENV === 'dev') {
  app.use('*', logger());
}

app.route('/', homeRoutes);
app.route('/properties', propertyRoutes);

export default app;
