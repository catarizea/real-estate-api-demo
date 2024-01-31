import { z } from '@hono/zod-openapi';
import { and, gt } from 'drizzle-orm';
import { QueryBuilder } from 'drizzle-orm/mysql-core';
import { Context } from 'hono';

import { defaultPerPage } from '@/constants';
import { db } from '@/models';
import { searchView } from '@/models/schema';
import { SearchPropertyUnit } from '@/types';
import { paginationSchema } from '@/validators';

import convertBodyToQBuilder from './convertBodyToQBuilder';

const qb = new QueryBuilder();

const postSearchHandler = async (c: Context) => {
  let defaultLimit = defaultPerPage;

  const query = c.req.query();
  const body = await c.req.json();

  const qbArgs = body && body.and ? convertBodyToQBuilder(body.and) : [];

  let queryOp =
    qbArgs && qbArgs.length > 0
      ? qb
          .select()
          .from(searchView)
          .where(and(...qbArgs))
          .orderBy(searchView.id)
          .limit(defaultLimit)
          .$dynamic()
      : qb
          .select()
          .from(searchView)
          .orderBy(searchView.id)
          .limit(defaultLimit)
          .$dynamic();

  if (Object.keys(query).length > 0) {
    if (!('limit' in query || 'cursor' in query)) {
      return c.json(
        {
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
        },
        400,
      );
    }

    const valid = paginationSchema.safeParse(query);

    if (valid.success) {
      const { limit, cursor } = valid.data;

      if (limit) {
        defaultLimit = limit;
      }

      if (cursor) {
        queryOp =
          qbArgs && qbArgs.length > 0
            ? qb
                .select()
                .from(searchView)
                .where(and(gt(searchView.id, cursor), ...qbArgs))
                .orderBy(searchView.id)
                .limit(defaultLimit)
                .$dynamic()
            : qb
                .select()
                .from(searchView)
                .where(gt(searchView.id, cursor))
                .orderBy(searchView.id)
                .limit(defaultLimit)
                .$dynamic();
      } else {
        queryOp =
          qbArgs && qbArgs.length > 0
            ? qb
                .select()
                .from(searchView)
                .where(and(...qbArgs))
                .orderBy(searchView.id)
                .limit(defaultLimit)
                .$dynamic()
            : qb
                .select()
                .from(searchView)
                .orderBy(searchView.id)
                .limit(defaultLimit)
                .$dynamic();
      }
    }
  }

  const result = await db.execute(queryOp);

  return c.json({
    success: z.literal(true).value,
    data: result.rows as SearchPropertyUnit[],
  });
};

export default postSearchHandler;
