import { OpenAPIHono } from '@hono/zod-openapi';

import { postSearchHandler } from '@/controllers';
import { zodDefaultHook } from '@/middlewares';

import postSearch from './postSearch';

const app = new OpenAPIHono({
  defaultHook: zodDefaultHook,
});

app.openapi(postSearch, postSearchHandler);

export default app;
