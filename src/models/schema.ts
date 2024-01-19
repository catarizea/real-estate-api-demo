import { createId } from '@paralleldrive/cuid2';
import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const property = mysqlTable('property', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  address: varchar('address', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// TODO: Add all the other fields for the property table here

// TODO: Add all the other tables here
// Property Media
// Cities
// Communities
// Property Types
