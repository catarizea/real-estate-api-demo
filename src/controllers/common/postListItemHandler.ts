import { z } from '@hono/zod-openapi';
import { and, asc, desc, gt, lt, sql } from 'drizzle-orm';
import { Context } from 'hono';

import { defaultPerPage } from '@/constants';
import { db } from '@/models';
import {
  CommonModel,
  CommonPaginationOrderSchema,
  CommonSelectItemSchemaType,
} from '@/types';
import {
  badRequestResponse,
  dateIsoToDatetime,
  getModelFields,
  queryIsNotOk,
} from '@/utils';

import convertBodyToQBuilder from './convertBodyToQBuilder';

const postListItemHandler =
  ({
    model,
    getItemCursorValidatorByOrderBy,
    paginationItemOrderSchema,
  }: {
    model: CommonModel;
    getItemCursorValidatorByOrderBy: (orderBy: string) =>
      | z.ZodString
      | z.ZodNumber
      | z.ZodNativeEnum<{
          readonly t: 1;
          readonly f: 0;
        }>
      | z.ZodDate;
    paginationItemOrderSchema: CommonPaginationOrderSchema;
  }) =>
  async (c: Context) => {
    let defaultLimit = defaultPerPage;

    const query = c.req.query();
    const body = await c.req.json();

    const { fields } = getModelFields(model);

    const qbArgs =
      body && body.and ? convertBodyToQBuilder(model, body.and, fields) : [];

    let queryOp =
      qbArgs && qbArgs.length > 0
        ? db
            .select()
            .from(model)
            .where(and(...qbArgs))
            .orderBy(model.id)
            .limit(defaultLimit)
            .$dynamic()
        : db
            .select()
            .from(model)
            .orderBy(model.id)
            .limit(defaultLimit)
            .$dynamic();

    if (!Object.keys(query).length) {
      const result = await queryOp;

      return c.json({
        success: z.literal(true).value,
        data: result as unknown as CommonSelectItemSchemaType[],
      });
    }

    const notOk = queryIsNotOk(query, true);

    if (notOk) {
      return c.json(notOk, 400);
    }

    const valid = paginationItemOrderSchema.safeParse(query);

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

    let orderByField = asc(model.id);
    let orderDirection = 'asc';
    let dbField: keyof typeof model.$inferSelect = 'id';

    if (orderBy) {
      const [field, order] = orderBy.split('-');
      orderDirection = order;

      dbField = field as keyof typeof model.$inferSelect;

      orderByField =
        order === 'asc' ? asc(model[dbField]) : desc(model[dbField]);
    }

    if (!cursor) {
      queryOp =
        qbArgs && qbArgs.length > 0
          ? db
              .select()
              .from(model)
              .where(and(...qbArgs))
              .orderBy(orderByField)
              .limit(defaultLimit)
              .$dynamic()
          : db
              .select()
              .from(model)
              .orderBy(orderByField)
              .limit(defaultLimit)
              .$dynamic();

      const result = await queryOp;

      return c.json({
        success: z.literal(true).value,
        data: result as unknown as CommonSelectItemSchemaType[],
      });
    }

    let cursorArg = gt(model.id, `${cursor}`);

    if (orderBy) {
      const validator = getItemCursorValidatorByOrderBy(orderBy);

      const validCursor = validator.safeParse(cursor);

      if (!validCursor.success) {
        return c.json(
          badRequestResponse({
            reason: 'validation error',
            message: JSON.parse(validCursor.error.message)[0].message,
            path: ['cursor'],
          }),
          400,
        );
      }

      if (dbField === 'createdAt') {
        cursorArg =
          orderDirection === 'asc'
            ? sql`${model.createdAt} > ${dateIsoToDatetime(`${cursor}`)}`
            : sql`${model.createdAt} < ${dateIsoToDatetime(`${cursor}`)}`;
      } else if (dbField === 'updatedAt') {
        cursorArg =
          orderDirection === 'asc'
            ? sql`${model.updatedAt} > ${dateIsoToDatetime(`${cursor}`)}`
            : sql`${model.updatedAt} < ${dateIsoToDatetime(`${cursor}`)}`;
      } else {
        cursorArg =
          orderDirection === 'asc'
            ? gt(model[dbField], cursor)
            : lt(model[dbField], cursor);
      }
    }

    queryOp =
      qbArgs && qbArgs.length > 0
        ? db
            .select()
            .from(model)
            .where(and(cursorArg, ...qbArgs))
            .orderBy(orderByField)
            .limit(defaultLimit)
            .$dynamic()
        : db
            .select()
            .from(model)
            .where(cursorArg)
            .orderBy(orderByField)
            .limit(defaultLimit)
            .$dynamic();

    const result = await queryOp;

    return c.json({
      success: z.literal(true).value,
      data: result as unknown as CommonSelectItemSchemaType[],
    });
  };

export default postListItemHandler;
