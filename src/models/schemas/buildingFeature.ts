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

export const buildingFeature = mysqlTable('building_feature', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  order: int('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const buildingFeaturePropertyRelations = relations(
  buildingFeature,
  ({ many }) => ({
    buildingFeatureToProperty: many(buildingFeatureToProperty),
  }),
);

export const buildingFeatureToProperty = mysqlTable(
  'building_feature_to_property',
  {
    buildingFeatureId: varchar('building_feature_id', {
      length: 128,
    }).notNull(),
    propertyId: varchar('property_id', { length: 128 }).notNull(),
  },
  (t) => ({
    pk: primaryKey({
      name: 'building_feature_to_property_pk',
      columns: [t.buildingFeatureId, t.propertyId],
    }),
  }),
);

export const buildingFeatureToPropertyRelations = relations(
  buildingFeatureToProperty,
  ({ one }) => ({
    buildingFeature: one(buildingFeature, {
      fields: [buildingFeatureToProperty.buildingFeatureId],
      references: [buildingFeature.id],
    }),
    property: one(property, {
      fields: [buildingFeatureToProperty.propertyId],
      references: [property.id],
    }),
  }),
);
