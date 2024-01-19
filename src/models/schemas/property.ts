import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

import { bathroom } from './bathroom';
import { bedroom } from './bedroom';
import { city } from './city';
import { community } from './community';
import { feature } from './feature';
import { media } from './media';
import { parking } from './parking';
import { type } from './type';

export const property = mysqlTable('property', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  address: varchar('address', { length: 256 }).notNull(),
  typeId: varchar('type_id', { length: 128 }).notNull(),
  bedroomId: varchar('bedroom_id', { length: 128 }),
  bathroomId: varchar('bathroom_id', { length: 128 }),
  communityId: varchar('community_id', { length: 128 }),
  cityId: varchar('city_id', { length: 128 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// TODO: Add all the other fields for the property table here

export const propertyBathroomRelations = relations(property, ({ one }) => ({
  bathroom: one(bathroom, {
    fields: [property.bathroomId],
    references: [bathroom.id],
  }),
}));

export const propertyBedroomRelations = relations(property, ({ one }) => ({
  bedroom: one(bedroom, {
    fields: [property.bedroomId],
    references: [bedroom.id],
  }),
}));

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

export const propertyMediaRelations = relations(property, ({ many }) => ({
  medias: many(media),
}));

export const propertyParkingRelations = relations(property, ({ many }) => ({
  parkings: many(parking),
}));

export const propertyTypeRelations = relations(property, ({ one }) => ({
  type: one(type, {
    fields: [property.typeId],
    references: [type.id],
  }),
}));
