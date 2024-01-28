/* eslint-disable no-console */
import { and, between, eq, or } from 'drizzle-orm';
import { QueryBuilder } from 'drizzle-orm/mysql-core';

import { db } from '@/models';
import { allView } from '@/models/schema';

const start = performance.now();

const qb = new QueryBuilder();

const query = qb
  .select()
  .from(allView)
  .where(
    and(
      between(allView.rent, 1000, 1200),
      eq(allView.smoking, 1),
      or(eq(allView.cats, 1), eq(allView.dogs, 1)),
      eq(allView.bedroom, '2 Beds'),
    ),
  );

const result = await db.execute(query);

const duration = performance.now() - start;

if (result) {
  console.log(`Result rows no.: ${result.rows.length}`);
} else {
  console.log('No result');
}

console.log(`duration: ${Math.round(duration)} ms`);
