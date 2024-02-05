import { z } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';
import pick from 'lodash.pick';

import { db } from '@/models';
import { parking } from '@/models/schema';
import { UpdateParkingSchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';
import * as taxonomy from '@/utils/db/taxonomy';

const putUpdateParkingHandler = async (c: Context) => {
  const id = c.req.param('id');
  const body: UpdateParkingSchema = await c.req.json();

  if (
    !body ||
    Object.keys(body).length === 0 ||
    Object.keys(body).length > 4 ||
    (!Object.keys(body).includes('name') &&
      !Object.keys(body).includes('fee') &&
      !Object.keys(body).includes('feeInterval') &&
      !Object.keys(body).includes('order'))
  ) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message:
          'body must contain valid name or fee or feeInterval or order or all',
        path: ['name', 'fee', 'feeInterval', 'order'],
      }),
      400,
    );
  }

  if (body.name && !taxonomy.parking.includes(body.name)) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: `name must be one of ${taxonomy.parking.join(', ')}`,
        path: ['name'],
      }),
      400,
    );
  }

  const existingItem = await db.query.parking.findFirst({
    where: (parking, { eq }) => eq(parking.id, id),
  });

  if (!existingItem) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: `parking with id ${id} does not exist`,
        path: ['id'],
      }),
      400,
    );
  }

  await db
    .update(parking)
    .set({
      ...pick(body, ['name', 'fee', 'feeInterval', 'order']),
      updatedAt: new Date(),
    })
    .where(eq(parking.id, id));

  return c.json({ success: z.literal(true).value, data: { id } }, 200);
};

export default putUpdateParkingHandler;
