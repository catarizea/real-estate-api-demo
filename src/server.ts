import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';

import {
  contentTypeChecker,
  httpExceptionHandler,
  httpLogger,
} from '@/middlewares';
import routes from '@/routes';

const app = new OpenAPIHono();

if (process.env.BUN_ENV && process.env.BUN_ENV === 'algolia') {
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

app.use('*', httpLogger);
app.use('*', contentTypeChecker);

app.onError(httpExceptionHandler);

routes.forEach(({ path, routes }) => {
  app.route(path, routes);
});

export default app;
