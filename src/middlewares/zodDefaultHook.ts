/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hook, z } from '@hono/zod-openapi';
import { Env } from 'hono';

const zodDefaultHook: Hook<any, Env, any, any> = (result, c) => {
  if (!result.success && result.error && result.error.issues) {
    const unionErrors = result.error.issues.filter((issue) =>
      issue.code.includes('invalid_union'),
    );

    if (unionErrors.length) {
      const errors = unionErrors[0] as z.ZodInvalidUnionIssue;

      const issues = errors.unionErrors.map((error) =>
        error.issues.map((issue) => ({
          message: issue.message,
          path: issue.path,
        })),
      );

      return c.json(
        {
          success: z.literal(false).value,
          error: {
            reason: 'validation error',
            issues,
          },
        },
        400,
      );
    }

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
