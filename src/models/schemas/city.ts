import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

import { community } from './community';
import { property } from './property';
import { region } from './region';

export const city = mysqlTable('city', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  regionId: varchar('region_id', { length: 128 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const cityPropertyRelations = relations(city, ({ many }) => ({
  properties: many(property),
}));

export const cityCommunityRelations = relations(city, ({ many }) => ({
  communities: many(community),
}));

export const cityRegionRelations = relations(city, ({ one }) => ({
  region: one(region, {
    fields: [city.regionId],
    references: [region.id],
  }),
}));
