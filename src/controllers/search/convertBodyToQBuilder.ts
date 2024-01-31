import { between, eq, or, SQL, sql } from 'drizzle-orm';

import { searchView } from '@/models/schema';
import { getBoundingBox } from '@/utils';
import { SearchSchema } from '@/validators';

const convertBodyToQBuilder = (and: SearchSchema): SQL<unknown>[] | null => {
  const args: (SQL<unknown> | undefined)[] = [];

  and.forEach((item) => {
    if (item[0] === 'or') {
      const orArgs = item[1].map((orItem) => {
        if (orItem[0] === 'eq') {
          return eq(searchView[orItem[1]], orItem[2]);
        }
      });

      args.push(or(...orArgs));
    }

    if (item[0] === 'eq') {
      args.push(eq(searchView[item[1]], item[2]));
    }

    if (item[0] === 'between') {
      args.push(between(searchView[item[1]], item[2], item[3]));
    }

    if (item[0] === 'like') {
      args.push(
        sql`MATCH (${searchView[item[1]]}) AGAINST (${item[2]} IN NATURAL LANGUAGE MODE)`,
      );
    }

    if (item[0] === 'aroundLatLng') {
      const boundingBox = getBoundingBox(
        { latitude: item[1], longitude: item[2] },
        item[3],
      );

      args.push(
        sql`${searchView.latitude} BETWEEN ${boundingBox[0].latitude} AND ${boundingBox[1].latitude}`,
      );

      args.push(
        sql`${searchView.longitude} BETWEEN ${boundingBox[0].longitude} AND ${boundingBox[1].longitude}`,
      );

      args.push(
        sql`ST_Distance_Sphere(POINT(${item[2]}, ${item[1]}), POINT(${searchView.longitude}, ${searchView.latitude})) < ${item[3]}`,
      );
    }
  });

  const filteredArgs = args.filter((item) => typeof item !== 'undefined');

  if (filteredArgs.length === 0) {
    return null;
  }

  return filteredArgs as SQL<unknown>[];
};

export default convertBodyToQBuilder;
