import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import {
  decimal,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

import { city } from './city';
import { communityFeature } from './communityFeature';
import { property } from './property';

export const community = mysqlTable(
  'community',
  {
    id: varchar('id', { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    score: int('score'),
    imageUrl: varchar('image_url', { length: 256 }),
    quadrant: varchar('quadrant', { length: 32 }),
    sector: varchar('sector', { length: 128 }),
    ward: varchar('ward', { length: 64 }),
    population: int('population'),
    dwellings: int('dwellings'),
    usedForRenting: decimal('used_for_renting', { precision: 4, scale: 2 }),
    area: decimal('area', { precision: 10, scale: 2 }),
    density: decimal('density', { precision: 10, scale: 2 }),
    averageIncome: int('average_income'),
    lowIncome: decimal('low_income', { precision: 4, scale: 2 }),
    immigrants: decimal('immigrants', { precision: 4, scale: 2 }),
    elevation: int('elevation'),
    established: int('established'),
    description: text('description'),
    latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
    longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
    cityId: varchar('city_id', { length: 128 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => ({
    latIdx: index('lat_idx').on(t.latitude),
    longIdx: index('long_idx').on(t.longitude),
  }),
);

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
