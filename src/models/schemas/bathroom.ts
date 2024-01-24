import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

import { unit } from './unit';

export const bathroom = mysqlTable('bathroom', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  order: int('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bathroomUnitRelations = relations(bathroom, ({ many }) => ({
  units: many(unit),
}));
