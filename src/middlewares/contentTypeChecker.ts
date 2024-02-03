import { MiddlewareHandler } from 'hono';

import { badRequestResponse } from '@/utils';

const contentTypeChecker: MiddlewareHandler = async (c, next) => {
  const contentType = c.req.header('content-type');

  if (contentType && contentType !== 'application/json') {
    return c.json(
      badRequestResponse({
        reason: 'unsupported media type',
        message: 'only application/json is supported as content-type',
        path: ['content-type'],
      }),
      415,
    );
  }

  await next();
};

export default contentTypeChecker;
