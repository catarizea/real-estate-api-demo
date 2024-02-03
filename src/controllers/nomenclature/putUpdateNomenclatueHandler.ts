import { z } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';
import pick from 'lodash.pick';

import { db } from '@/models';
import { UpdateBathroomSchema } from '@/models/zodSchemas';
import { NomenclatureModel } from '@/types';
import { badRequestResponse } from '@/utils';

const putUpdateNomenclatureHandler =
  (model: NomenclatureModel) => async (c: Context) => {
    const id = c.req.param('id');
    const body: UpdateBathroomSchema = await c.req.json();

    if (
      !body ||
      Object.keys(body).length === 0 ||
      Object.keys(body).length > 2 ||
      (!Object.keys(body).includes('name') &&
        !Object.keys(body).includes('order'))
    ) {
      return c.json(
        badRequestResponse({
          reason: 'validation error',
          message: 'body must contain valid name or order or both',
          path: ['name', 'order'],
        }),
        400,
      );
    }

    const extistingItem = await db.select().from(model).where(eq(model.id, id));

    if (!extistingItem.length) {
      return c.json(
        badRequestResponse({
          reason: 'validation error',
          message: 'id must be an existing string id',
          path: ['id'],
        }),
        400,
      );
    }

    await db
      .update(model)
      .set(pick(body, ['name', 'order']))
      .where(eq(model.id, id));

    return c.json({ success: z.literal(true).value, data: { id } }, 201);
  };

export default putUpdateNomenclatureHandler;
