import { OpenAPIHono } from '@hono/zod-openapi';

import {
  postCreateBathroomHandler,
  postListBathroomHandler,
} from '@/controllers';
import { zodDefaultHook } from '@/middlewares';

import postCreateBathroom from './postCreateBathroom';
import postListBathroom from './postListBathroom';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(postListBathroom, postListBathroomHandler);

app.openapi(postCreateBathroom, postCreateBathroomHandler);

export default app;
