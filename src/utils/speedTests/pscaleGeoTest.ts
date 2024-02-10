/* eslint-disable no-console */
import { and, sql } from 'drizzle-orm';

import { testPoint } from '@/constants';
import { db } from '@/models';
import { searchView } from '@/models/schema';
import { getBoundingBox } from '@/utils';

const start = performance.now();

const boundingBox = getBoundingBox(testPoint, 1000);

const query = db
  .select()
  .from(searchView)
  .where(
    and(
      sql`MATCH (${searchView.address}) AGAINST ('Crescent' IN NATURAL LANGUAGE MODE)`,
      sql`${searchView.latitude} BETWEEN ${boundingBox[0].latitude} AND ${boundingBox[1].latitude}`,
      sql`${searchView.longitude} BETWEEN ${boundingBox[0].longitude} AND ${boundingBox[1].longitude}`,
      sql`ST_Distance_Sphere(POINT(${testPoint.longitude}, ${testPoint.latitude}), POINT(${searchView.longitude}, ${searchView.latitude})) < 1000`,
    ),
  )
  .limit(50)
  .$dynamic();

const result = await query;

const duration = performance.now() - start;

if (result) {
  console.log(`========================================`);
  console.log('PLANETSCALE GEOSPATIAL QUERY TEST RESULT');
  console.log(`========================================`);
  console.log(`Result number of rows: ${result.length}`);
  console.log(`Result rows:`, result);
  console.log(`Duration: ${Math.round(duration)} ms`);
} else {
  console.log('No result');
}
