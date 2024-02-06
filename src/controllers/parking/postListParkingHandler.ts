import { z } from '@hono/zod-openapi';
import { and, asc, desc, gt, lt, sql } from 'drizzle-orm';
import { Context } from 'hono';

import { defaultPerPage } from '@/constants';
import { db } from '@/models';
import { parking } from '@/models/schema';
import { SelectParkingSchema } from '@/models/zodSchemas';
import { badRequestResponse, dateIsoToDatetime, queryIsNotOk } from '@/utils';
import {
  getParkingCursorValidatorByOrderBy,
  paginationParkingOrderSchema,
} from '@/validators';

import convertBodyToQBuilder from './convertBodyToQBuilder';

const postListParkingHandler = async (c: Context) => {
  let defaultLimit = defaultPerPage;

  const query = c.req.query();
  const body = await c.req.json();

  const qbArgs = body && body.and ? convertBodyToQBuilder(body.and) : [];

  let queryOp =
    qbArgs && qbArgs.length > 0
      ? db
          .select()
          .from(parking)
          .where(and(...qbArgs))
          .orderBy(parking.id)
          .limit(defaultLimit)
          .$dynamic()
      : db
          .select()
          .from(parking)
          .orderBy(parking.id)
          .limit(defaultLimit)
          .$dynamic();

  if (!Object.keys(query).length) {
    const result = await queryOp;

    return c.json({
      success: z.literal(true).value,
      data: result as unknown as SelectParkingSchema[],
    });
  }

  const notOk = queryIsNotOk(query, true);

  if (notOk) {
    return c.json(notOk, 400);
  }

  const valid = paginationParkingOrderSchema.safeParse(query);

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

  let orderByField = asc(parking.id);
  let orderDirection = 'asc';
  let dbField: keyof typeof parking.$inferSelect = 'id';

  if (orderBy) {
    const [field, order] = orderBy.split('-');
    orderDirection = order;

    dbField = field as keyof typeof parking.$inferSelect;

    orderByField =
      order === 'asc' ? asc(parking[dbField]) : desc(parking[dbField]);
  }

  if (!cursor) {
    queryOp =
      qbArgs && qbArgs.length > 0
        ? db
            .select()
            .from(parking)
            .where(and(...qbArgs))
            .orderBy(orderByField)
            .limit(defaultLimit)
            .$dynamic()
        : db
            .select()
            .from(parking)
            .orderBy(orderByField)
            .limit(defaultLimit)
            .$dynamic();

    const result = await queryOp;

    return c.json({
      success: z.literal(true).value,
      data: result as unknown as SelectParkingSchema[],
    });
  }

  let cursorArg = gt(parking.id, `${cursor}`);

  if (orderBy) {
    const validator = getParkingCursorValidatorByOrderBy(orderBy);

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
          ? sql`${parking.createdAt} > ${dateIsoToDatetime(`${cursor}`)}`
          : sql`${parking.createdAt} < ${dateIsoToDatetime(`${cursor}`)}`;
    } else if (dbField === 'updatedAt') {
      cursorArg =
        orderDirection === 'asc'
          ? sql`${parking.updatedAt} > ${dateIsoToDatetime(`${cursor}`)}`
          : sql`${parking.updatedAt} < ${dateIsoToDatetime(`${cursor}`)}`;
    } else {
      cursorArg =
        orderDirection === 'asc'
          ? gt(parking[dbField], cursor)
          : lt(parking[dbField], cursor);
    }
  }

  queryOp =
    qbArgs && qbArgs.length > 0
      ? db
          .select()
          .from(parking)
          .where(and(cursorArg, ...qbArgs))
          .orderBy(orderByField)
          .limit(defaultLimit)
          .$dynamic()
      : db
          .select()
          .from(parking)
          .where(cursorArg)
          .orderBy(orderByField)
          .limit(defaultLimit)
          .$dynamic();

  const result = await queryOp;

  return c.json({
    success: z.literal(true).value,
    data: result as unknown as SelectParkingSchema[],
  });
};

export default postListParkingHandler;
