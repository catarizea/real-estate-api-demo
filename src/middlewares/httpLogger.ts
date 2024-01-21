import type { MiddlewareHandler } from 'hono';

import { logger } from '@/services';

let httpLogger: MiddlewareHandler = async (_, next) => {
  await next();
};

if (process.env.BUN_ENV !== 'test') {
  httpLogger = async (c, next) => {
    const start = performance.now();

    await next();

    logger.info(
      `[API] ${c.req.method} ${c.req.path} ${c.res.status} ${Math.round(performance.now() - start)} ms`,
    );
  };
}

export default httpLogger;
