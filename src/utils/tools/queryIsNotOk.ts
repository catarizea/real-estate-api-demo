import { z } from '@hono/zod-openapi';

const queryIsNotOk = (query: Record<string, string>) => {
  if (!('limit' in query || 'cursor' in query)) {
    return {
      success: z.literal(false).value,
      error: {
        reason: 'validation error',
        issues: [
          {
            message: 'query must only contain limit or cursor or both',
            path: ['cursor', 'limit'],
          },
        ],
      },
    };
  }
};

export default queryIsNotOk;
