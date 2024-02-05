import { OpenAPIHono } from '@hono/zod-openapi';

import { getParkingsByPropertyHandler } from '@/controllers';
import { zodDefaultHook } from '@/middlewares';

import getParkingsByProperty from './getParkingsByProperty';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(getParkingsByProperty, getParkingsByPropertyHandler);

export default app;
