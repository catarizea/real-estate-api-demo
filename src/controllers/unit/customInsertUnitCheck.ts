import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { bathroom, bedroom } from '@/models/schema';
import { InsertUnitSchema, UpdateUnitSchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customInsertUnitCheck = async (
  body: InsertUnitSchema | UpdateUnitSchema,
) => {
  if (body.bathroomId) {
    const bathroomExists = await db
      .select({ id: bathroom.id })
      .from(bathroom)
      .where(eq(bathroom.id, body.bathroomId))
      .limit(1);

    if (bathroomExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `bathroom with id ${body.bathroomId} does not exist`,
          path: ['bathroomId'],
        }),
      );
    }
  }

  if (body.bedroomId) {
    const bedroomExists = await db
      .select({ id: bedroom.id })
      .from(bedroom)
      .where(eq(bedroom.id, body.bedroomId))
      .limit(1);

    if (bedroomExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `bedroom with id ${body.bedroomId} does not exist`,
          path: ['bedroomId'],
        }),
      );
    }
  }

  return null;
};

export default customInsertUnitCheck;
