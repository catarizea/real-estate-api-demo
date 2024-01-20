import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import {
  boolean,
  decimal,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

import { buildingFeature } from './buildingFeature';
import { city } from './city';
import { community } from './community';
import { feature } from './feature';
import { floorPlan } from './floorPlan';
import { media } from './media';
import { parking } from './parking';
import { typeProp } from './typeProp';
import { unit } from './unit';

export const property = mysqlTable('property', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  listingId: int('listing_id').notNull().autoincrement().unique(),
  name: varchar('name', { length: 256 }).notNull(),
  address: varchar('address', { length: 256 }).notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
  longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
  yearBuilt: int('year_built'),
  descriptionTitle: varchar('description_title', { length: 256 }),
  descriptionSubtitle: varchar('description_subtitle', { length: 256 }),
  descriptionText: text('description_text'),
  typePropId: varchar('type_id', { length: 128 }).notNull(),
  communityId: varchar('community_id', { length: 128 }),
  cityId: varchar('city_id', { length: 128 }).notNull(),
  smoking: boolean('smoking').notNull().default(false),
  cats: boolean('cats').notNull().default(false),
  dogs: boolean('dogs').notNull().default(false),
  petsNegotiable: boolean('pets_negotiable').notNull().default(false),
  petsFee: int('pets_fee'),
  petsFeeInterval: varchar('pets_fee_interval', { length: 128 }),
  published: boolean('published').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const propertyBuildingFeatureRelations = relations(
  property,
  ({ many }) => ({
    buildingFeatures: many(buildingFeature),
  }),
);

export const propertyCityRelations = relations(property, ({ one }) => ({
  city: one(city, {
    fields: [property.cityId],
    references: [city.id],
  }),
}));

export const propertyCommunityRelations = relations(property, ({ one }) => ({
  community: one(community, {
    fields: [property.communityId],
    references: [community.id],
  }),
}));

export const propertyFeatureRelations = relations(property, ({ many }) => ({
  features: many(feature),
}));

export const propertyFloorPlanRelations = relations(property, ({ many }) => ({
  floorPlans: many(floorPlan),
}));

export const propertyMediaRelations = relations(property, ({ many }) => ({
  medias: many(media),
}));

export const propertyParkingRelations = relations(property, ({ many }) => ({
  parkings: many(parking),
}));

export const propertyTypeRelations = relations(property, ({ one }) => ({
  typeProp: one(typeProp, {
    fields: [property.typePropId],
    references: [typeProp.id],
  }),
}));

export const propertyUnitRelations = relations(property, ({ many }) => ({
  units: many(unit),
}));
