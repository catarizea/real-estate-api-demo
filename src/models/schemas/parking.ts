import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

import { property } from './property';

export const parking = mysqlTable('parking', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  propertyId: varchar('property_id', { length: 128 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const parkingPropertyRelations = relations(parking, ({ one }) => ({
  property: one(property, {
    fields: [parking.propertyId],
    references: [property.id],
  }),
}));