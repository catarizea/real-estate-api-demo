import { eq } from 'drizzle-orm';

import { db } from '@/models';
import { floorPlan, property } from '@/models/schema';
import {
  InsertFloorPlanSchema,
  UpdateFloorPlanSchema,
} from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';

const customInsertFloorPlanCheck = async (
  body: InsertFloorPlanSchema | UpdateFloorPlanSchema,
  id?: string,
) => {
  let existingItem: (typeof floorPlan.$inferSelect)[] | null = null;

  if (id) {
    const existing = await db
      .select()
      .from(floorPlan)
      .where(eq(floorPlan.id, id));

    if (existing.length > 0) {
      existingItem = existing;
    }
  }

  if (body.propertyId) {
    const propertyExists = await db
      .select()
      .from(property)
      .where(eq(property.id, body.propertyId));

    if (propertyExists.length === 0) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `property with id ${body.propertyId} does not exist`,
          path: ['propertyId'],
        }),
      );
    }

    if (existingItem && existingItem[0].propertyId !== body.propertyId) {
      return JSON.stringify(
        badRequestResponse({
          reason: 'validation error',
          message: `propertyId ${body.propertyId} cannot replace existing value for floorPlan with id ${id}`,
          path: ['propertyId'],
        }),
      );
    }
  }

  return null;
};

export default customInsertFloorPlanCheck;
