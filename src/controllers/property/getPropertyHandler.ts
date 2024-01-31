import { z } from '@hono/zod-openapi';
import { desc, sql } from 'drizzle-orm';
import { QueryBuilder } from 'drizzle-orm/mysql-core';
import { Context } from 'hono';

import { defaultPerPage } from '@/constants';
import { db, zodSchemas } from '@/models';
import { property } from '@/models/schema';
import { querySchema } from '@/routes/property/getProperty';
import { dateIsoToDatetime } from '@/utils';

const qb = new QueryBuilder();

const getPropertyHandler = async (c: Context) => {
  let defaultLimit = defaultPerPage;

  const query = c.req.query();

  let queryOp = qb
    .select()
    .from(property)
    .orderBy(desc(property.createdAt))
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

    const valid = querySchema.safeParse(query);

    if (valid.success) {
      const { limit, cursor } = valid.data;

      if (limit) {
        defaultLimit = limit;
      }

      if (cursor) {
        queryOp = qb
          .select()
          .from(property)
          .where(sql`${property.createdAt} < ${dateIsoToDatetime(cursor)}`)
          .orderBy(desc(property.createdAt))
          .limit(defaultLimit)
          .$dynamic();
      } else {
        queryOp = qb
          .select()
          .from(property)
          .orderBy(desc(property.createdAt))
          .limit(defaultLimit)
          .$dynamic();
      }
    }
  }

  const result = await db.execute(queryOp);

  return c.json({
    success: z.literal(true).value,
    data: result.rows as zodSchemas.SelectPropertySchema[],
  });
};

export default getPropertyHandler;
