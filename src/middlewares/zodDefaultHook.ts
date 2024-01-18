/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hook } from '@hono/zod-openapi';
import { Env } from 'hono';

const zodDefaultHook: Hook<any, Env, any, any> = (result, c) => {
  if (!result.success) {
    if (result.error.issues) {
      return c.json(
        {
          success: 'false',
          error: {
            reason: 'validation error',
            issues: result.error.issues.map((issue) => ({
              message: issue.message,
              path: issue.path,
            })),
          },
        },
        400,
      );
    }

    return c.json(
      { success: 'false', error: { reason: 'validation error' } },
      400,
    );
  }
};

export default zodDefaultHook;
