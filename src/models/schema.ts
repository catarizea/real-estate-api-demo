import { createId } from '@paralleldrive/cuid2';
import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const property = mysqlTable('property', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }),
  address: varchar('address', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
