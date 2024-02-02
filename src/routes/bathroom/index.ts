import { OpenAPIHono } from '@hono/zod-openapi';

import {
  deleteBathroomHandler,
  postCreateBathroomHandler,
  postListBathroomHandler,
  putUpdateBathroomHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';

import deleteBathroom from './deleteBathroom';
import postCreateBathroom from './postCreateBathroom';
import postListBathroom from './postListBathroom';
import putUpdateBathroom from './putUpdateBathroom';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(postListBathroom, postListBathroomHandler);

app.openapi(postCreateBathroom, postCreateBathroomHandler);

app.openapi(putUpdateBathroom, putUpdateBathroomHandler);

app.openapi(deleteBathroom, deleteBathroomHandler);

export default app;
