import { z } from '@hono/zod-openapi';
import { Context } from 'hono';

import { db } from '@/models';
import { preparedParkingByProperty } from '@/models/preparedStatements';
import { badRequestResponse } from '@/utils';

const getParkingsByPropertyHandler = async (c: Context) => {
  const itemId = c.req.param('itemId');

  const propertyExists = await db.query.property.findFirst({
    where: (property, { eq }) => eq(property.id, itemId),
  });

  if (!propertyExists) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: `property with id ${itemId} does not exist`,
        path: ['itemId'],
      }),
      400,
    );
  }

  const parkings = await preparedParkingByProperty.execute({
    propertyId: itemId,
  });

  return c.json({ success: z.literal(true).value, data: parkings });
};

export default getParkingsByPropertyHandler;
