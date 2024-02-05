import { z } from '@hono/zod-openapi';
import { createId } from '@paralleldrive/cuid2';
import { Context } from 'hono';

import { db } from '@/models';
import { parking } from '@/models/schema';
import { InsertParkingSchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';
import * as taxonomy from '@/utils/db/taxonomy';

const postCreateParkingHandler = async (c: Context) => {
  const body: InsertParkingSchema = await c.req.json();

  if (!body || !body.propertyId || !body.name || !body.order) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: 'body must contain valid propertyId, name and order',
        path: ['propertyId', 'name', 'order'],
      }),
      400,
    );
  }

  if (!taxonomy.parking.includes(body.name)) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: `name must be one of ${taxonomy.parking.join(', ')}`,
        path: ['name'],
      }),
      400,
    );
  }

  const propertyExists = await db.query.property.findFirst({
    where: (property, { eq }) => eq(property.id, body.propertyId),
  });

  if (!propertyExists) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: `property with id ${body.propertyId} does not exist`,
        path: ['propertyId'],
      }),
      400,
    );
  }

  const parkingExists = await db.query.parking.findFirst({
    where: (parking, { and, eq }) =>
      and(eq(parking.propertyId, body.propertyId), eq(parking.name, body.name)),
  });

  if (parkingExists) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: `parking with name ${body.name} already exists for property with id ${body.propertyId}`,
        path: ['name'],
      }),
      400,
    );
  }

  const id = createId();

  await db.insert(parking).values({ id, ...body });

  return c.json({ success: z.literal(true).value, data: { id } }, 201);
};

export default postCreateParkingHandler;
