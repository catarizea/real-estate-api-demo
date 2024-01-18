import { z } from '@hono/zod-openapi';
import { desc, sql } from 'drizzle-orm';
import { QueryBuilder } from 'drizzle-orm/mysql-core';
import { Context } from 'hono';

import { db, zodSchemas } from '@/models';
import { property } from '@/models/schema';
import { dateIsoToDatetime } from '@/utils';

const querySchema = z.object({
  limit: z.coerce.number().optional(),
  cursor: z.string().datetime().optional(),
});

const qb = new QueryBuilder();

export const getAllProperties = async (c: Context) => {
  let defaultLimit = 10;
  const query = c.req.query();

  let queryOp = qb
    .select()
    .from(property)
    .orderBy(desc(property.createdAt))
    .limit(defaultLimit)
    .$dynamic();

  if (Object.keys(query).length > 0) {
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
    success: 'true',
    data: result.rows as zodSchemas.SelectPropertySchema[],
  });
};
