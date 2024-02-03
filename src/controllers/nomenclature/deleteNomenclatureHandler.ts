import { z } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';

import { db } from '@/models';
import { NomenclatureModel } from '@/types';
import { badRequestResponse } from '@/utils';

const deleteNomenclatureHandler =
  (model: NomenclatureModel) => async (c: Context) => {
    const id = c.req.param('id');

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

    await db.delete(model).where(eq(model.id, id));

    return c.json({ success: z.literal(true).value });
  };

export default deleteNomenclatureHandler;
