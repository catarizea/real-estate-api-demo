import { z } from '@hono/zod-openapi';
import { createId } from '@paralleldrive/cuid2';
import { Context } from 'hono';
import pick from 'lodash.pick';

import { db } from '@/models';
import { InsertBathroomSchema } from '@/models/zodSchemas';
import { NomenclatureModel } from '@/types';
import { badRequestResponse } from '@/utils';

const postCreateNomenclatureHandler =
  (model: NomenclatureModel) => async (c: Context) => {
    const body: InsertBathroomSchema = await c.req.json();

    if (!body || !body.name || !body.order) {
      return c.json(
        badRequestResponse({
          reason: 'validation error',
          message: 'body must contain valid name and order',
          path: ['name', 'order'],
        }),
        400,
      );
    }

    const id = createId();

    await db.insert(model).values({ id, ...pick(body, ['name', 'order']) });

    return c.json({ success: z.literal(true).value, data: { id } }, 201);
  };

export default postCreateNomenclatureHandler;
