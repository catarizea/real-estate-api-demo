import { z } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';
import intersection from 'lodash.intersection';
import pick from 'lodash.pick';

import { db } from '@/models';
import { UpdateBathroomSchema } from '@/models/zodSchemas';
import { NomenclatureModel } from '@/types';
import { badRequestResponse } from '@/utils';

const fields = ['name', 'order'];

const putUpdateNomenclatureHandler =
  (model: NomenclatureModel) => async (c: Context) => {
    const id = c.req.param('id');
    const body: UpdateBathroomSchema = await c.req.json();

    if (
      !body ||
      Object.keys(body).length === 0 ||
      Object.keys(body).length > fields.length ||
      intersection(Object.keys(body), fields).length === 0
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

    const existingItem = await db.select().from(model).where(eq(model.id, id));

    if (!existingItem.length) {
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
      .set({ ...pick(body, fields), updatedAt: new Date() })
      .where(eq(model.id, id));

    return c.json({ success: z.literal(true).value, data: { id } }, 200);
  };

export default putUpdateNomenclatureHandler;
