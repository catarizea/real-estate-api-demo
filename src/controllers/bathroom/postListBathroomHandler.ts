import { z } from '@hono/zod-openapi';
import { and, asc, desc, gt, lt, sql } from 'drizzle-orm';
import { Context } from 'hono';

import { defaultPerPage } from '@/constants';
import { db } from '@/models';
import { bathroom } from '@/models/schema';
import { SelectBathroomSchema } from '@/models/zodSchemas';
import { badRequestResponse, dateIsoToDatetime, queryIsNotOk } from '@/utils';
import {
  getCursorValidatorByOrderBy,
  paginationOrderSchema,
} from '@/validators';

import convertBodyToQBuilder from './convertBodyToQBuilder';

const postListBathroomHandler = async (c: Context) => {
  let defaultLimit = defaultPerPage;

  const query = c.req.query();
  const body = await c.req.json();

  const qbArgs = body && body.and ? convertBodyToQBuilder(body.and) : [];

  let queryOp =
    qbArgs && qbArgs.length > 0
      ? db
          .select()
          .from(bathroom)
          .where(and(...qbArgs))
          .orderBy(bathroom.id)
          .limit(defaultLimit)
          .$dynamic()
      : db
          .select()
          .from(bathroom)
          .orderBy(bathroom.id)
          .limit(defaultLimit)
          .$dynamic();

  if (!Object.keys(query).length) {
    const result = await queryOp;

    return c.json({
      success: z.literal(true).value,
      data: result as unknown as SelectBathroomSchema[],
    });
  }

  const notOk = queryIsNotOk(query, true);

  if (notOk) {
    return c.json(notOk, 400);
  }

  const valid = paginationOrderSchema.safeParse(query);

  if (!valid.success) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: 'query must contain valid limit, cursor and orderBy',
        path: ['limit', 'cursor', 'orderBy'],
      }),
      400,
    );
  }

  const { limit, orderBy, cursor } = valid.data;

  if (limit) {
    defaultLimit = limit;
  }

  let orderByField = asc(bathroom.id);
  let orderDirection = 'asc';
  let dbField: keyof typeof bathroom.$inferSelect = 'id';

  if (orderBy) {
    const [field, order] = orderBy.split('-');
    orderDirection = order;

    dbField = field as keyof typeof bathroom.$inferSelect;

    orderByField =
      order === 'asc' ? asc(bathroom[dbField]) : desc(bathroom[dbField]);
  }

  if (!cursor) {
    queryOp =
      qbArgs && qbArgs.length > 0
        ? db
            .select()
            .from(bathroom)
            .where(and(...qbArgs))
            .orderBy(orderByField)
            .limit(defaultLimit)
            .$dynamic()
        : db
            .select()
            .from(bathroom)
            .orderBy(orderByField)
            .limit(defaultLimit)
            .$dynamic();

    const result = await queryOp;

    return c.json({
      success: z.literal(true).value,
      data: result as unknown as SelectBathroomSchema[],
    });
  }

  let cursorArg = gt(bathroom.id, `${cursor}`);

  if (orderBy) {
    const validator = getCursorValidatorByOrderBy(orderBy);

    const validCursor = validator.safeParse(cursor);

    if (!validCursor.success) {
      return c.json(
        badRequestResponse({
          reason: 'validation error',
          message: `query must contain a valid cursor for orderBy ${orderBy}`,
          path: ['cursor'],
        }),
        400,
      );
    }

    if (dbField === 'createdAt') {
      cursorArg =
        orderDirection === 'asc'
          ? sql`${bathroom.createdAt} > ${dateIsoToDatetime(`${cursor}`)}`
          : sql`${bathroom.createdAt} < ${dateIsoToDatetime(`${cursor}`)}`;
    } else if (dbField === 'updatedAt') {
      cursorArg =
        orderDirection === 'asc'
          ? sql`${bathroom.updatedAt} > ${dateIsoToDatetime(`${cursor}`)}`
          : sql`${bathroom.updatedAt} < ${dateIsoToDatetime(`${cursor}`)}`;
    } else {
      cursorArg =
        orderDirection === 'asc'
          ? gt(bathroom[dbField], cursor)
          : lt(bathroom[dbField], cursor);
    }
  }

  queryOp =
    qbArgs && qbArgs.length > 0
      ? db
          .select()
          .from(bathroom)
          .where(and(cursorArg, ...qbArgs))
          .orderBy(orderByField)
          .limit(defaultLimit)
          .$dynamic()
      : db
          .select()
          .from(bathroom)
          .where(cursorArg)
          .orderBy(orderByField)
          .limit(defaultLimit)
          .$dynamic();

  const result = await queryOp;

  return c.json({
    success: z.literal(true).value,
    data: result as unknown as SelectBathroomSchema[],
  });
};

export default postListBathroomHandler;
