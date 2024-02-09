import { z } from '@hono/zod-openapi';
import { createId } from '@paralleldrive/cuid2';
import { Context } from 'hono';
import intersection from 'lodash.intersection';
import pick from 'lodash.pick';
import without from 'lodash.without';

import { db } from '@/models';
import { CommonModel } from '@/types';
import { badRequestResponse, getModelFields } from '@/utils';

const postCreateItemHandler =
  <InsertItemType>({
    model,
    customCheck,
    onSuccess,
  }: {
    model: CommonModel;
    customCheck?: (body: InsertItemType) => Promise<string | null>;
    onSuccess?: (id: string) => Promise<void>;
  }) =>
  async (c: Context) => {
    const body: InsertItemType = await c.req.json();
    const { required, optional } = getModelFields(model);
    const mandatory = without(required, 'id');

    if (
      !body ||
      Object.keys(body).length === 0 ||
      Object.keys(body).length > mandatory.length ||
      intersection(Object.keys(body), mandatory).length === 0
    ) {
      return c.json(
        badRequestResponse({
          reason: 'validation error',
          message: `body must contain valid ${mandatory.join(' and ')}`,
          path: mandatory,
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

    const id = createId();

    await db.insert(model).values({
      id,
      ...pick(body, [...mandatory, ...optional]),
    } as unknown as typeof model.$inferInsert);

    if (onSuccess) {
      await onSuccess(id);
    }

    return c.json({ success: z.literal(true).value, data: { id } }, 201);
  };

export default postCreateItemHandler;
