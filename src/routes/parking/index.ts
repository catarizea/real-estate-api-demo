import { OpenAPIHono } from '@hono/zod-openapi';

import {
  deleteParkingHandler,
  getParkingsByPropertyHandler,
  postCreateParkingHandler,
  putUpdateParkingHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';

import deleteParking from './deleteParking';
import getParkingsByProperty from './getParkingsByProperty';
import postCreateParking from './postCreateParking';
import putUpdateParking from './putUpdateParking';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(getParkingsByProperty, getParkingsByPropertyHandler);

app.openapi(postCreateParking, postCreateParkingHandler);

app.openapi(putUpdateParking, putUpdateParkingHandler);

app.openapi(deleteParking, deleteParkingHandler);

export default app;
