import { desc, sql } from 'drizzle-orm';
import { QueryBuilder } from 'drizzle-orm/mysql-core';
import { Context } from 'hono';

import { db, zodSchemas } from '@/models';
import { property } from '@/models/schema';
import { querySchema } from '@/routes/propertyRoutes';
import { dateIsoToDatetime } from '@/utils';

const qb = new QueryBuilder();

export const getAllProperties = async (c: Context) => {
  let defaultLimit = 10;

  const emptyResponse = c.json({
    success: 'true',
    data: [],
  });

  const query = c.req.query();

  let queryOp = qb
    .select()
    .from(property)
    .orderBy(desc(property.createdAt))
    .limit(defaultLimit)
    .$dynamic();

  if (Object.keys(query).length > 0) {
    if (!('limit' in query || 'cursor' in query)) {
      return emptyResponse;
    }

    const valid = querySchema.safeParse(query);

    if (!valid.success && valid.error) {
      return emptyResponse;
    }

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
    success: 'true',
    data: result.rows as zodSchemas.SelectPropertySchema[],
  });
};
