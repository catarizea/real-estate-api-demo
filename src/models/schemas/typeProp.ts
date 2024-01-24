import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

import { property } from './property';

export const typeProp = mysqlTable('type_prop', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  order: int('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const typePropPropertyRelations = relations(typeProp, ({ many }) => ({
  properties: many(property),
}));
