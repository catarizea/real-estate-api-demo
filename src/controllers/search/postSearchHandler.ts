import { z } from '@hono/zod-openapi';
import { and, gt } from 'drizzle-orm';
import { Context } from 'hono';

import { defaultPerPage } from '@/constants';
import { db } from '@/models';
import { searchView } from '@/models/schema';
import { SearchPropertyUnit } from '@/types';
import { badRequestResponse, queryIsNotOk } from '@/utils';
import { paginationSchema } from '@/validators';

import convertBodyToQBuilder from './convertBodyToQBuilder';
import { all, selectFields } from './searchFields';

const postSearchHandler = async (c: Context) => {
  let defaultLimit = defaultPerPage;

  const query = c.req.query();
  const body = await c.req.json();

  const qbArgs = body && body.and ? convertBodyToQBuilder(body.and) : [];
  const fields = body && body.fields ? selectFields(body.fields) : all;

  let queryOp =
    qbArgs && qbArgs.length > 0
      ? db
          .select(fields)
          .from(searchView)
          .where(and(...qbArgs))
          .orderBy(searchView.id)
          .limit(defaultLimit)
          .$dynamic()
      : db
          .select(fields)
          .from(searchView)
          .orderBy(searchView.id)
          .limit(defaultLimit)
          .$dynamic();

  if (!Object.keys(query).length) {
    const result = await queryOp;

    return c.json({
      success: z.literal(true).value,
      data: result as SearchPropertyUnit[],
    });
  }

  const notOk = queryIsNotOk(query);

  if (notOk) {
    return c.json(notOk, 400);
  }

  const valid = paginationSchema.safeParse(query);

  if (!valid.success) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: 'query must contain valid limit and cursor',
        path: ['limit', 'cursor'],
      }),
      400,
    );
  }

  const { limit, cursor } = valid.data;

  if (limit) {
    defaultLimit = limit;
  }

  if (cursor) {
    queryOp =
      qbArgs && qbArgs.length > 0
        ? db
            .select(fields)
            .from(searchView)
            .where(and(gt(searchView.id, cursor), ...qbArgs))
            .orderBy(searchView.id)
            .limit(defaultLimit)
            .$dynamic()
        : db
            .select(fields)
            .from(searchView)
            .where(gt(searchView.id, cursor))
            .orderBy(searchView.id)
            .limit(defaultLimit)
            .$dynamic();

    const result = await queryOp;

    return c.json({
      success: z.literal(true).value,
      data: result as SearchPropertyUnit[],
    });
  }

  queryOp =
    qbArgs && qbArgs.length > 0
      ? db
          .select(fields)
          .from(searchView)
          .where(and(...qbArgs))
          .orderBy(searchView.id)
          .limit(defaultLimit)
          .$dynamic()
      : db
          .select(fields)
          .from(searchView)
          .orderBy(searchView.id)
          .limit(defaultLimit)
          .$dynamic();

  const result = await queryOp;

  return c.json({
    success: z.literal(true).value,
    data: result as SearchPropertyUnit[],
  });
};

export default postSearchHandler;
