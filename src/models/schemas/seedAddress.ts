import { createId } from '@paralleldrive/cuid2';
import {
  decimal,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const seedAddress = mysqlTable('seed_address', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  address: varchar('name', { length: 256 }).notNull(),
  streetNumber: varchar('street_number', { length: 128 }).notNull(),
  streetName: varchar('street_name', { length: 128 }).notNull(),
  neighborhood: varchar('neighborhood', { length: 100 }),
  zipCode: varchar('zip_code', { length: 30 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  administrativeLong: varchar('administrative_long', { length: 100 }),
  administrativeShort: varchar('administrative_short', { length: 100 }),
  country: varchar('country', { length: 100 }).notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
  longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
