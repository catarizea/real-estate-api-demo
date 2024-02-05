import { OpenAPIHono } from '@hono/zod-openapi';

import {
  deleteParkingHandler,
  getParkingsByPropertyHandler,
  postCreateParkingHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';

import deleteParking from './deleteParking';
import getParkingsByProperty from './getParkingsByProperty';
import postCreateParking from './postCreateParking';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(getParkingsByProperty, getParkingsByPropertyHandler);

app.openapi(postCreateParking, postCreateParkingHandler);

app.openapi(deleteParking, deleteParkingHandler);

export default app;
