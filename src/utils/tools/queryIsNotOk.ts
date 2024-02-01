import { z } from '@hono/zod-openapi';

const queryIsNotOk = (query: Record<string, string>, hasOrderBy = false) => {
  if (!('limit' in query || 'cursor' in query) && !hasOrderBy) {
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

  if (
    !('limit' in query || 'cursor' in query || 'orderBy' in query) &&
    hasOrderBy
  ) {
    return {
      success: z.literal(false).value,
      error: {
        reason: 'validation error',
        issues: [
          {
            message:
              'query must only contain limit or cursor or orderBy or all',
            path: ['cursor', 'limit', 'orderBy'],
          },
        ],
      },
    };
  }
};

export default queryIsNotOk;
