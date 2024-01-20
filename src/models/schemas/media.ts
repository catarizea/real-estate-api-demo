import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

import { property } from './property';

export const media = mysqlTable('media', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  url: varchar('url', { length: 256 }).notNull(),
  mediaTypeId: varchar('media_type_id', { length: 128 }).notNull(),
  propertyId: varchar('property_id', { length: 128 }).notNull(),
  order: int('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const mediaMediaTypeRelations = relations(media, ({ one }) => ({
  mediaType: one(mediaType, {
    fields: [media.mediaTypeId],
    references: [mediaType.id],
  }),
}));

export const mediaPropertyRelations = relations(media, ({ one }) => ({
  property: one(property, {
    fields: [media.propertyId],
    references: [property.id],
  }),
}));

export const mediaType = mysqlTable('media_type', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const mediaTypeMediaRelations = relations(mediaType, ({ many }) => ({
  media: many(media),
}));
