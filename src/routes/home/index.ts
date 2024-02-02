import { OpenAPIHono } from '@hono/zod-openapi';
import { Context } from 'hono';

import getHome from './getHome';

const app = new OpenAPIHono();

const homeHandler = (c: Context) =>
  c.json({
    message: 'real estate api demo',
  });

app.openapi(getHome, homeHandler);

export default app;
