import { swaggerUI } from '@hono/swagger-ui';

import app from '@/server';

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
