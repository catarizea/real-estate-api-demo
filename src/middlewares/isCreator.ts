import { getAuth } from '@hono/clerk-auth';
import { MiddlewareHandler } from 'hono';

import { AuthOrg } from '@/types';
import { badRequestResponse } from '@/utils';

const isCreator: MiddlewareHandler = async (c, next) => {
  const auth: AuthOrg = getAuth(c);

  if (!auth || auth.sessionClaims?.role.indexOf('org:creator') === -1) {
    return c.json(
      badRequestResponse({
        reason: 'forbidden',
        message: 'you are not a creator',
        path: ['role'],
      }),
      403,
    );
  }

  await next();
};

export default isCreator;
