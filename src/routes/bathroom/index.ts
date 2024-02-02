import { OpenAPIHono } from '@hono/zod-openapi';

import {
  deleteBathroomHandler,
  postCreateBathroomHandler,
  postListBathroomHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';

import deleteBathroom from './deleteBathroom';
import postCreateBathroom from './postCreateBathroom';
import postListBathroom from './postListBathroom';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(postListBathroom, postListBathroomHandler);

app.openapi(postCreateBathroom, postCreateBathroomHandler);

app.openapi(deleteBathroom, deleteBathroomHandler);

export default app;
