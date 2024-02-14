import { swaggerUI } from '@hono/swagger-ui';

import { rabbitMqQueue } from '@/constants';
import { rabbitMqConsumer } from '@/providers/rabbitmq';
import app from '@/server';

rabbitMqConsumer(rabbitMqQueue);

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
