import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { property, typeProp } from '@/models/schema';
import { UpdateBathroomSchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customUpdateTypePropCheck = async (
  body: UpdateBathroomSchema,
  id?: string,
) => {
  if (!id) {
    return JSON.stringify(
      badRequestResponse({
        reason: 'validation error',
        message: `id query param is missing`,
        path: ['id'],
      }),
    );
  }

  const existingItem = await db
    .select()
    .from(typeProp)
    .where(eq(typeProp.id, id));

  if (existingItem.length === 0) {
    return JSON.stringify(
      badRequestResponse({
        reason: 'validation error',
        message: `typeProp with id ${id} does not exist`,
        path: ['id'],
      }),
    );
  }

  if (body.name && body.name !== existingItem[0].name) {
    const childExists = await db
      .select()
      .from(property)
      .where(eq(property.typePropId, id))
      .limit(1);

    if (childExists.length > 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `name cannot be replaced for typeProp with id ${id} because it has children and it would change the meaning`,
          path: ['name'],
        }),
      );
    }
  }

  return null;
};

export default customUpdateTypePropCheck;
