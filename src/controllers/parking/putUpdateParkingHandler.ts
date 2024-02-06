import { z } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';
import intersection from 'lodash.intersection';
import pick from 'lodash.pick';

import { db } from '@/models';
import { parking } from '@/models/schema';
import { UpdateParkingSchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';
import * as taxonomy from '@/utils/db/taxonomy';

const fields = ['name', 'fee', 'feeInterval', 'order'];

const putUpdateParkingHandler = async (c: Context) => {
  const id = c.req.param('id');
  const body: UpdateParkingSchema = await c.req.json();

  if (
    !body ||
    Object.keys(body).length === 0 ||
    Object.keys(body).length > fields.length ||
    intersection(Object.keys(body), fields).length === 0
  ) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message:
          'body must contain valid name or fee or feeInterval or order or all',
        path: fields,
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
      ...pick(body, fields),
      updatedAt: new Date(),
    })
    .where(eq(parking.id, id));

  return c.json({ success: z.literal(true).value, data: { id } }, 200);
};

export default putUpdateParkingHandler;
