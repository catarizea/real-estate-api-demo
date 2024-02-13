import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { bathroom, bedroom, floorPlan, property, unit } from '@/models/schema';
import { InsertUnitSchema, UpdateUnitSchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customInsertUnitCheck = async (
  body: InsertUnitSchema | UpdateUnitSchema,
  id?: string,
) => {
  let unitExists: (typeof unit.$inferSelect)[] | null = null;

  if (id) {
    const exists = await db.select().from(unit).where(eq(unit.id, id));

    if (exists.length > 0) {
      unitExists = exists;
    }
  }

  if (body.propertyId) {
    const propertyExists = await db
      .select()
      .from(property)
      .where(eq(property.id, body.propertyId))
      .limit(1);

    if (propertyExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `property with id ${body.propertyId} does not exist`,
          path: ['propertyId'],
        }),
      );
    }

    if (
      unitExists &&
      unitExists.length > 0 &&
      unitExists[0].propertyId !== propertyExists[0].id
    ) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `property with id ${body.propertyId} cannot replace existing property id for unit with id ${id}`,
          path: ['propertyId'],
        }),
      );
    }
  }

  if (body.floorPlanId) {
    const floorPlanExists = await db
      .select()
      .from(floorPlan)
      .where(eq(floorPlan.id, body.floorPlanId))
      .limit(1);

    if (floorPlanExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `floorPlan with id ${body.floorPlanId} does not exist`,
          path: ['floorPlanId'],
        }),
      );
    }

    if (body.propertyId && floorPlanExists[0].propertyId !== body.propertyId) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `floorPlan with id ${body.floorPlanId} does not belong to property with id ${body.propertyId}`,
          path: ['floorPlanId'],
        }),
      );
    }

    if (
      unitExists &&
      unitExists.length > 0 &&
      unitExists[0].floorPlanId !== floorPlanExists[0].id
    ) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `floorPlan with id ${body.floorPlanId} cannot replace existing floorPlan id for unit with id ${id}`,
          path: ['floorPlanId'],
        }),
      );
    }
  }

  if (body.bathroomId) {
    const bathroomExists = await db
      .select()
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
      .select()
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
