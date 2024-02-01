import { eq, or, SQL } from 'drizzle-orm';

import { bathroom } from '@/models/schema';
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
      });

      args.push(or(...orArgs));
    }

    if (item[0] === 'eq') {
      args.push(eq(bathroom[item[1]], item[2]));
    }
  });

  const filteredArgs = args.filter((item) => typeof item !== 'undefined');

  if (filteredArgs.length === 0) {
    return null;
  }

  return filteredArgs as SQL<unknown>[];
};

export default convertBodyToQBuilder;
