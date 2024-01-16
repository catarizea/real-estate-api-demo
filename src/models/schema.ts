import { z } from '@hono/zod-openapi';
import { createId } from '@paralleldrive/cuid2';
import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { createSelectSchema } from 'drizzle-zod';

export const property = mysqlTable('property', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  address: varchar('address', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const selectPropertySchema = createSelectSchema(property, {
  createdAt: z.string(),
  updatedAt: z.string(),
});
