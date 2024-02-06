import { z } from '@hono/zod-openapi';
import { createId } from '@paralleldrive/cuid2';
import { Context } from 'hono';
import intersection from 'lodash.intersection';
import pick from 'lodash.pick';

import { db } from '@/models';
import { InsertBathroomSchema } from '@/models/zodSchemas';
import { NomenclatureModel } from '@/types';
import { badRequestResponse } from '@/utils';

const fields = ['name', 'order'];

const postCreateNomenclatureHandler =
  (model: NomenclatureModel) => async (c: Context) => {
    const body: InsertBathroomSchema = await c.req.json();

    if (
      !body ||
      Object.keys(body).length > fields.length ||
      intersection(Object.keys(body), fields).length === 0
    ) {
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

    await db
      .insert(model)
      .values({ id, ...pick(body, fields) } as InsertBathroomSchema);

    return c.json({ success: z.literal(true).value, data: { id } }, 201);
  };

export default postCreateNomenclatureHandler;
