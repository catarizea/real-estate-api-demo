import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import {
  index,
  int,
  mysqlTable,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core';

import { property } from './property';

export const parking = mysqlTable(
  'parking',
  {
    id: varchar('id', { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    propertyId: varchar('property_id', { length: 128 }).notNull(),
    fee: int('fee'),
    feeInterval: varchar('fee_interval', { length: 128 }),
    order: int('order').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => ({
    propertyIdIdx: index('property_id_idx').on(t.propertyId),
    uniqueNamePropertyId: unique('unique_name_property_id').on(
      t.name,
      t.propertyId,
    ),
  }),
);

export const parkingPropertyRelations = relations(parking, ({ one }) => ({
  property: one(property, {
    fields: [parking.propertyId],
    references: [property.id],
  }),
}));
