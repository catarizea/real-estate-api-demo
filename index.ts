import { swaggerUI } from '@hono/swagger-ui';

import { apiVersion, rabbitMqQueue } from '@/constants';
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
    version: `${apiVersion}`,
  },
  openapi: '3.1.0',
});

export default app;
