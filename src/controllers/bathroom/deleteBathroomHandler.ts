import { z } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';

import { db } from '@/models';
import { bathroom } from '@/models/schema';
import { badRequestResponse } from '@/utils';

const deleteBathroomHandler = async (c: Context) => {
  const id = c.req.param('id');

  const extistingBathroom = await db
    .select()
    .from(bathroom)
    .where(eq(bathroom.id, id));

  if (!extistingBathroom.length) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: 'id must be an existing string id',
        path: ['id'],
      }),
      400,
    );
  }

  await db.delete(bathroom).where(eq(bathroom.id, id));

  return c.json({ success: z.literal(true).value });
};

export default deleteBathroomHandler;
