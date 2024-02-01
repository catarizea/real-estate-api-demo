import { z } from '@hono/zod-openapi';
import { and, gt } from 'drizzle-orm';
import { Context } from 'hono';

import { defaultPerPage } from '@/constants';
import { db } from '@/models';
import { bathroom } from '@/models/schema';
import { SelectBathroomSchema } from '@/models/zodSchemas';
import { paginationSchema } from '@/validators';

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
            ? db
                .select()
                .from(bathroom)
                .where(and(gt(bathroom.id, cursor), ...qbArgs))
                .orderBy(bathroom.id)
                .limit(defaultLimit)
                .$dynamic()
            : db
                .select()
                .from(bathroom)
                .where(gt(bathroom.id, cursor))
                .orderBy(bathroom.id)
                .limit(defaultLimit)
                .$dynamic();
      } else {
        queryOp =
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
      }
    }
  }

  const result = await queryOp;

  return c.json({
    success: z.literal(true).value,
    data: result as unknown as SelectBathroomSchema[],
  });
};

export default postListBathroomHandler;
