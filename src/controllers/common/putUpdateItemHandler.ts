import { z } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';
import intersection from 'lodash.intersection';
import omit from 'lodash.omit';
import pick from 'lodash.pick';

import { db } from '@/models';
import { CommonModel, CommonUpdateSchema, NomenclatureTag } from '@/types';
import { badRequestResponse, getModelFields } from '@/utils';

const putUpdateItemHandler =
  ({
    model,
    tag,
    updateSchema,
    customCheck,
    onSuccess,
  }: {
    model: CommonModel;
    tag: NomenclatureTag;
    updateSchema: CommonUpdateSchema;
    customCheck?: (body: typeof updateSchema) => Promise<string | null>;
    onSuccess?: (id: string) => Promise<void>;
  }) =>
  async (c: Context) => {
    const id = c.req.param('id');
    const body: typeof updateSchema = await c.req.json();

    const { required, optional } = getModelFields(model);
    const mandatory = omit(required, 'id');
    const fields = [...mandatory, ...optional];

    if (
      !body ||
      Object.keys(body).length === 0 ||
      Object.keys(body).length > fields.length ||
      intersection(Object.keys(body), fields).length === 0
    ) {
      return c.json(
        badRequestResponse({
          reason: 'validation error',
          message: `body must contain valid ${fields.join(' or ')} or all`,
          path: fields,
        }),
        400,
      );
    }

    if (customCheck) {
      const customCheckError = await customCheck(body);
      if (customCheckError) {
        return c.json(JSON.parse(customCheckError), 400);
      }
    }

    const existingItem = await db.select().from(model).where(eq(model.id, id));

    if (!existingItem.length) {
      return c.json(
        badRequestResponse({
          reason: 'validation error',
          message: `${tag} with id ${id} does not exist`,
          path: ['id'],
        }),
        400,
      );
    }

    await db
      .update(model)
      .set({
        ...pick(body, fields),
        updatedAt: new Date(),
      })
      .where(eq(model.id, id));

    if (onSuccess) {
      await onSuccess(id);
    }

    return c.json({ success: z.literal(true).value, data: { id } }, 200);
  };

export default putUpdateItemHandler;
