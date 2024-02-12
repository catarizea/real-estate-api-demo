import { z } from '@hono/zod-openapi';
import { Context } from 'hono';

import { db } from '@/models';
import { preparedRegion } from '@/models/preparedStatements';
import { badRequestResponse } from '@/utils';
import { PreparedRegionSchema } from '@/validators';

const getRegionHandler = async (c: Context) => {
  const id = c.req.param('id');

  const regionExists = await db.query.region.findFirst({
    where: (region, { eq }) => eq(region.id, id),
  });

  if (!regionExists) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: `region with id ${id} does not exist`,
        path: ['id'],
      }),
      400,
    );
  }

  const region = await preparedRegion.execute({
    id,
  });

  return c.json({
    success: z.literal(true).value,
    data: region as PreparedRegionSchema,
  });
};

export default getRegionHandler;
