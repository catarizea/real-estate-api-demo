import { z } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';
import intersection from 'lodash.intersection';
import pick from 'lodash.pick';
import without from 'lodash.without';

import { db } from '@/models';
import {
  CommonModel,
  CommonSelectItemSchemaType,
  CommonUpdateItemSchema,
  NomenclatureTag,
} from '@/types';
import { badRequestResponse, getModelFields } from '@/utils';

const putUpdateItemHandler =
  <UpdateItemSchema>({
    model,
    tag,
    customCheck,
    onSuccess,
  }: {
    model: CommonModel;
    tag: NomenclatureTag;
    customCheck?: (
      body: UpdateItemSchema,
      id?: string,
      tag?: NomenclatureTag,
    ) => Promise<string | null>;
    onSuccess?: (
      id: string,
      newValues: CommonUpdateItemSchema & { updatedAt: Date },
      oldValues: CommonSelectItemSchemaType,
    ) => Promise<void>;
  }) =>
  async (c: Context) => {
    const id = c.req.param('id');
    const body: UpdateItemSchema = await c.req.json();

    const { required, optional } = getModelFields(model);
    const mandatory = without(required, 'id');
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
      const customCheckError = await customCheck(body, id, tag);
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

    const newValues = {
      ...pick(body, fields),
      updatedAt: new Date(),
    };

    await db.update(model).set(newValues).where(eq(model.id, id));

    if (onSuccess) {
      await onSuccess(
        id,
        newValues,
        existingItem[0] as unknown as CommonSelectItemSchemaType,
      );
    }

    return c.json({ success: z.literal(true).value, data: { id } }, 200);
  };

export default putUpdateItemHandler;
