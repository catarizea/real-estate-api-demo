import { OpenAPIHono } from '@hono/zod-openapi';

import {
  getParkingsByPropertyHandler,
  postCreateParkingHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';

import getParkingsByProperty from './getParkingsByProperty';
import postCreateParking from './postCreateParking';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(getParkingsByProperty, getParkingsByPropertyHandler);

app.openapi(postCreateParking, postCreateParkingHandler);

export default app;
