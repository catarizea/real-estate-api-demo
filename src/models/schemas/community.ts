import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

import { city } from './city';
import { property } from './property';

export const community = mysqlTable('community', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  cityId: varchar('city_id', { length: 128 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const communityPropertyRelations = relations(community, ({ many }) => ({
  properties: many(property),
}));

export const communityCityRelations = relations(community, ({ one }) => ({
  city: one(city, {
    fields: [community.cityId],
    references: [city.id],
  }),
}));
