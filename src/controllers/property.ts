import { Context } from 'hono';

import { db } from '@/models';

export const getAllProperties = async (c: Context) => {
  const result = await db.query.property.findMany();

  return c.json({
    success: 'true',
    data: result,
  });
};

// TODO: Add pagination
