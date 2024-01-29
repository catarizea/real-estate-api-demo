/* eslint-disable no-console */
import { and, between, eq, sql } from 'drizzle-orm';
import { QueryBuilder } from 'drizzle-orm/mysql-core';

import { db } from '@/models';
import { searchView } from '@/models/schema';

const start = performance.now();

const qb = new QueryBuilder();

const query = qb
  .select()
  .from(searchView)
  .where(
    and(
      between(searchView.rent, 1000, 1200),
      eq(searchView.bedroom, '2 Beds'),
      sql`MATCH (${searchView.parking}) AGAINST ('Underground' IN NATURAL LANGUAGE MODE)`,
    ),
  );

const result = await db.execute(query);

const duration = performance.now() - start;

if (result) {
  console.log(`=======================`);
  console.log('PLANETSCALE TEST RESULT');
  console.log(`=======================`);
  console.log(`Result number of rows: ${result.rows.length}`);
} else {
  console.log('No result');
}

console.log(`Duration: ${Math.round(duration)} ms`);
