import { z } from '@hono/zod-openapi';
import { createId } from '@paralleldrive/cuid2';
import { Context } from 'hono';
import intersection from 'lodash.intersection';
import pick from 'lodash.pick';
import without from 'lodash.without';

import { db } from '@/models';
import { CommonInsertItemSchema, CommonModel } from '@/types';
import { badRequestResponse, getModelFields } from '@/utils';

const postCreateItemHandler =
  <InsertItemType>({
    model,
    customCheck,
    onSuccess,
    postmanId,
  }: {
    model: CommonModel;
    customCheck?: (body: InsertItemType) => Promise<string | null>;
    onSuccess?: (
      id: string,
      newValues: CommonInsertItemSchema,
    ) => Promise<void>;
    postmanId: string;
  }) =>
  async (c: Context) => {
    const body: InsertItemType = await c.req.json();
    const { required, optional } = getModelFields(model);

    if (
      !body ||
      Object.keys(body).length === 0 ||
      intersection(Object.keys(body), required).length === 0
    ) {
      return c.json(
        badRequestResponse({
          reason: 'validation error',
          message: `body must contain valid ${required.join(' and ')}`,
          path: required,
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

    const id =
      process.env.BUN_ENV && ['test', 'postman'].includes(process.env.BUN_ENV)
        ? postmanId
        : createId();
    const newValues = {
      id,
      ...pick(body, [
        ...required,
        ...without(optional, 'id', 'createdAt', 'updatedAt'),
      ]),
    } as unknown as typeof model.$inferInsert;

    await db.insert(model).values(newValues);

    if (onSuccess) {
      await onSuccess(id, newValues);
    }

    return c.json({ success: z.literal(true).value, data: { id } }, 201);
  };

export default postCreateItemHandler;
