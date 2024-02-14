import { z } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';

import { db } from '@/models';
import {
  CommonChild,
  CommonModel,
  CommonSelectItemSchemaType,
  NomenclatureTag,
} from '@/types';
import { badRequestResponse } from '@/utils';

import checkChildren from './checkChildren';

const deleteItemHandler =
  ({
    model,
    tag,
    idField,
    children,
    onSuccess,
  }: {
    model: CommonModel;
    tag: NomenclatureTag;
    idField: string;
    children?: CommonChild[];
    onSuccess?: (
      id: string,
      oldValues: CommonSelectItemSchemaType,
    ) => Promise<void>;
  }) =>
  async (c: Context) => {
    const id = c.req.param('id');

    const itemExists = await db
      .select()
      .from(model)
      .where(eq(model[idField as keyof typeof model.$inferSelect], id));

    if (!itemExists.length) {
      return c.json(
        badRequestResponse({
          reason: 'validation error',
          message: `${tag} with id ${id} does not exist`,
          path: ['id'],
        }),
        400,
      );
    }

    if (children) {
      const hasChildrenResult = await checkChildren(tag, children, id);

      if (hasChildrenResult) {
        return c.json(hasChildrenResult, 409);
      }
    }

    await db
      .delete(model)
      .where(eq(model[idField as keyof typeof model.$inferSelect], id));

    if (onSuccess) {
      await onSuccess(
        id,
        itemExists[0] as unknown as CommonSelectItemSchemaType,
      );
    }

    return c.json({ success: z.literal(true).value });
  };

export default deleteItemHandler;
