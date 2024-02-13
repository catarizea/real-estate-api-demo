import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { bathroom, bedroom, unit } from '@/models/schema';
import { UpdateBathroomSchema } from '@/models/zodSchemas';
import { NomenclatureTag } from '@/types';
import { badRequestResponse } from '@/utils';

const customBathroomBedroomCheck = async (
  body: UpdateBathroomSchema,
  id?: string,
  tag?: NomenclatureTag,
) => {
  const checkField =
    tag === NomenclatureTag.Bathroom ? unit.bathroomId : unit.bedroomId;
  const model = tag === NomenclatureTag.Bathroom ? bathroom : bedroom;

  if (!id) {
    return JSON.stringify(
      badRequestResponse({
        reason: 'validation error',
        message: `id query param is missing`,
        path: ['id'],
      }),
    );
  }

  const existingItem = await db.select().from(model).where(eq(model.id, id));

  if (existingItem.length === 0) {
    return JSON.stringify(
      badRequestResponse({
        reason: 'validation error',
        message: `${tag} with id ${id} does not exist`,
        path: ['id'],
      }),
    );
  }

  if (body.name && body.name !== existingItem[0].name) {
    const childExists = await db
      .select()
      .from(unit)
      .where(eq(checkField, id))
      .limit(1);

    if (childExists.length > 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `name cannot be replaced for ${tag} with id ${id} because it has children and it would change the meaning`,
          path: ['name'],
        }),
      );
    }
  }

  return null;
};

export default customBathroomBedroomCheck;
