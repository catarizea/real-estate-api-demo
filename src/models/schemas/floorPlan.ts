import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

import { property } from './property';
import { unit } from './unit';

export const floorPlan = mysqlTable('floor_plan', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  propertyId: varchar('property_id', { length: 128 }).notNull(),
  order: int('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const floorPlanPropertyRelations = relations(floorPlan, ({ one }) => ({
  property: one(property, {
    fields: [floorPlan.propertyId],
    references: [property.id],
  }),
}));

export const floorPlanUnitRelations = relations(floorPlan, ({ many }) => ({
  units: many(unit),
}));
