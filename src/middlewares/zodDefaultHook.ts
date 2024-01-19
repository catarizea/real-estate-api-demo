/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hook, z } from '@hono/zod-openapi';
import { Env } from 'hono';

const zodDefaultHook: Hook<any, Env, any, any> = (result, c) => {
  if (!result.success && result.error && result.error.issues) {
    return c.json(
      {
        success: z.literal(false).value,
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
};

export default zodDefaultHook;
