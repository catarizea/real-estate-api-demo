import { eq, lt, or, SQL, sql } from 'drizzle-orm';

import { bathroom } from '@/models/schema';
import { dateIsoToDatetime } from '@/utils';
import { BathroomListSchema } from '@/validators';

const convertBodyToQBuilder = (
  and: BathroomListSchema,
): SQL<unknown>[] | null => {
  const args: (SQL<unknown> | undefined)[] = [];

  and.forEach((item) => {
    if (item[0] === 'or') {
      const orArgs = item[1].map((orItem) => {
        if (orItem[0] === 'eq') {
          return eq(bathroom[orItem[1]], orItem[2]);
        }

        if (orItem[1] === 'createdAt' || orItem[1] === 'updatedAt') {
          if (orItem[0] === 'lt') {
            return sql`${bathroom[orItem[1]]} < ${dateIsoToDatetime(orItem[2])}`;
          }

          if (orItem[0] === 'gt') {
            return sql`${bathroom[orItem[1]]} > ${dateIsoToDatetime(orItem[2])}`;
          }

          if (orItem[0] === 'between') {
            return sql`${bathroom[orItem[1]]} BETWEEN ${dateIsoToDatetime(orItem[2])} AND ${dateIsoToDatetime(orItem[3])}`;
          }
        }
      });

      args.push(or(...orArgs));
    }

    if (item[0] === 'eq') {
      args.push(eq(bathroom[item[1]], item[2]));
    }

    if (item[1] === 'createdAt' || item[1] === 'updatedAt') {
      if (item[0] === 'lt') {
        args.push(sql`${bathroom[item[1]]} < ${dateIsoToDatetime(item[2])}`);
      }

      if (item[0] === 'gt') {
        args.push(sql`${bathroom[item[1]]} > ${dateIsoToDatetime(item[2])}`);
      }

      if (item[0] === 'between') {
        args.push(
          sql`${bathroom[item[1]]} BETWEEN ${dateIsoToDatetime(item[2])} AND ${dateIsoToDatetime(item[3])}`,
        );
      }
    }
  });

  const filteredArgs = args.filter((item) => typeof item !== 'undefined');

  if (filteredArgs.length === 0) {
    return null;
  }

  return filteredArgs as SQL<unknown>[];
};

export default convertBodyToQBuilder;
