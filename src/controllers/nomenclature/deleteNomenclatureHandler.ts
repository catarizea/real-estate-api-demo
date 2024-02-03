import { z } from '@hono/zod-openapi';
import { eq } from 'drizzle-orm';
import { Context } from 'hono';

import { db } from '@/models';
import { NomenclatureChild, NomenclatureModel, NomenclatureTag } from '@/types';
import { badRequestResponse } from '@/utils';

import checkChildren from './checkChildren';

const deleteNomenclatureHandler =
  (
    model: NomenclatureModel,
    tag: NomenclatureTag,
    idField: string,
    children?: NomenclatureChild[],
  ) =>
  async (c: Context) => {
    const id = c.req.param('id');

    const extistingItem = await db
      .select()
      .from(model)
      .where(eq(model[idField as keyof typeof model.$inferSelect], id));

    if (!extistingItem.length) {
      return c.json(
        badRequestResponse({
          reason: 'validation error',
          message: `id must be an existing string ${idField} of ${tag}`,
          path: [idField],
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

    return c.json({ success: z.literal(true).value });
  };

export default deleteNomenclatureHandler;
