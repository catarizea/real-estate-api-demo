import { z } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';

import { db } from '@/models';
import { parking } from '@/models/schema';
import { badRequestResponse } from '@/utils';

const deleteParkingHandler = async (c: Context) => {
  const id = c.req.param('id');

  const parkingExists = await db.query.parking.findFirst({
    where: (parking, { eq }) => eq(parking.id, id),
  });

  if (!parkingExists) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: `parking with id ${id} does not exist`,
        path: ['id'],
      }),
      400,
    );
  }

  await db.delete(parking).where(eq(parking.id, id));

  return c.json({ success: z.literal(true).value });
};

export default deleteParkingHandler;
