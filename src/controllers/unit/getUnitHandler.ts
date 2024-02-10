import { z } from '@hono/zod-openapi';
import { Context } from 'hono';

import { db } from '@/models';
import { preparedUnit } from '@/models/preparedStatements';
import { badRequestResponse } from '@/utils';
import { PreparedUnitSchema } from '@/validators';

const getUnitHandler = async (c: Context) => {
  const id = c.req.param('id');

  const unitExists = await db.query.unit.findFirst({
    where: (unit, { eq }) => eq(unit.id, id),
  });

  if (!unitExists) {
    return c.json(
      badRequestResponse({
        reason: 'validation error',
        message: `unit with id ${id} does not exist`,
        path: ['id'],
      }),
      400,
    );
  }

  const unit = await preparedUnit.execute({
    id,
  });

  return c.json({
    success: z.literal(true).value,
    data: unit as PreparedUnitSchema,
  });
};

export default getUnitHandler;
