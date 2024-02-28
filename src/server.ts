import { clerkMiddleware } from '@hono/clerk-auth';
import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';

import { apiVersion } from '@/constants';
import {
  contentTypeChecker,
  httpExceptionHandler,
  httpLogger,
  isAuthenticated,
  isCreator,
  rateLimiter,
} from '@/middlewares';
import routes from '@/routes';

const app = new OpenAPIHono();

if (
  process.env.BUN_ENV &&
  ['algolia', 'postman'].includes(process.env.BUN_ENV)
) {
  // eslint-disable-next-line no-console
  console.log(`hono pid: ${process.pid}`);
}

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);

app.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
  type: 'http',
  scheme: 'bearer',
});

app.use('*', rateLimiter);
app.use('*', httpLogger);
app.use('*', contentTypeChecker);
app.use('*', clerkMiddleware());

app.use(`/${apiVersion}/*`, isAuthenticated);
app.use(`/${apiVersion}/*/create`, isCreator);
app.use(`/${apiVersion}/*/update/*`, isCreator);
app.use(`/${apiVersion}/*/delete/*`, isCreator);

app.onError(httpExceptionHandler);

routes.forEach(({ path, routes }) => {
  app.route(path, routes);
});

export default app;
