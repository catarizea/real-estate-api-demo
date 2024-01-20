import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

import { property } from './property';

export const feature = mysqlTable('feature', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  order: int('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const featurePropertyRelations = relations(feature, ({ many }) => ({
  properties: many(property),
}));

export const featureToProperty = mysqlTable(
  'feature_to_property',
  {
    featureId: varchar('feature_id', { length: 128 }).notNull(),
    propertyId: varchar('property_id', { length: 128 }).notNull(),
  },
  (t) => ({
    pk: primaryKey({
      name: 'feature_to_property_pk',
      columns: [t.featureId, t.propertyId],
    }),
  }),
);

export const featureToPropertyRelations = relations(
  featureToProperty,
  ({ one }) => ({
    feature: one(feature, {
      fields: [featureToProperty.featureId],
      references: [feature.id],
    }),
    property: one(property, {
      fields: [featureToProperty.propertyId],
      references: [property.id],
    }),
  }),
);
