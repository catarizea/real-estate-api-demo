import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import {
  decimal,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

import { city } from './city';
import { communityFeature } from './communityFeature';
import { property } from './property';

export const community = mysqlTable('community', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
  longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
  cityId: varchar('city_id', { length: 128 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const communityCommunityFeatureRelations = relations(
  community,
  ({ many }) => ({
    communityFeatures: many(communityFeature),
  }),
);

export const communityPropertyRelations = relations(community, ({ many }) => ({
  properties: many(property),
}));

export const communityCityRelations = relations(community, ({ one }) => ({
  city: one(city, {
    fields: [community.cityId],
    references: [city.id],
  }),
}));
