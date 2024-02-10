import { z } from '@hono/zod-openapi';
import { Context } from 'hono';

import { db } from '@/models';
import { preparedProperty } from '@/models/preparedStatements';
import { badRequestResponse } from '@/utils';
import { PreparedPropertySchema } from '@/validators';

const getPropertyHandler = async (c: Context) => {
  const id = c.req.param('id');

  const propertyExists = await db.query.property.findFirst({
    where: (property, { eq }) => eq(property.id, id),
  });

  if (!propertyExists) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: `property with id ${id} does not exist`,
        path: ['id'],
      }),
      400,
    );
  }

  const property = await preparedProperty.execute({
    id,
  });

  return c.json({
    success: z.literal(true).value,
    data: property as PreparedPropertySchema,
  });
};

export default getPropertyHandler;
