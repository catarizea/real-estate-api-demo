import { getAuth } from '@hono/clerk-auth';
import { MiddlewareHandler } from 'hono';

import { AuthOrg } from '@/types';
import { badRequestResponse } from '@/utils';

const isAuthenticated: MiddlewareHandler = async (c, next) => {
  const auth: AuthOrg = getAuth(c);

  if (!auth?.userId) {
    return c.json(
      badRequestResponse({
        reason: 'unauthorized',
        message: 'you are not logged in',
        path: ['authorization'],
      }),
      401,
    );
  }

  await next();
};

export default isAuthenticated;
