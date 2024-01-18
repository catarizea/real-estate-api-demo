import { desc, sql } from 'drizzle-orm';
import { Context } from 'hono';

import { db } from '@/models';
import { property } from '@/models/schema';

export const getAllProperties = async (c: Context) => {
  const result = await db
    .select()
    .from(property)
    .limit(10)
    .orderBy(desc(property.createdAt));

  return c.json({
    success: 'true',
    data: result,
  });
};
