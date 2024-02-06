import { between, eq, gt, lt, or, SQL, sql } from 'drizzle-orm';

import { parking } from '@/models/schema';
import { dateIsoToDatetime } from '@/utils';
import { ParkingListSchema } from '@/validators';

const mapOperations = (ops: ParkingListSchema) => {
  const args: (SQL<unknown> | undefined)[] = [];

  ops.forEach((item) => {
    if (item[0] === 'eq') {
      args.push(eq(parking[item[1]], item[2]));
    }

    if (item[0] === 'lt' && (item[1] === 'order' || item[1] === 'fee')) {
      args.push(lt(parking[item[1]], item[2]));
    }

    if (item[0] === 'gt' && (item[1] === 'order' || item[1] === 'fee')) {
      args.push(gt(parking[item[1]], item[2]));
    }

    if (item[0] === 'between' && (item[1] === 'order' || item[1] === 'fee')) {
      args.push(between(parking[item[1]], item[2], item[3]));
    }

    if (item[1] === 'createdAt' || item[1] === 'updatedAt') {
      if (item[0] === 'lt') {
        args.push(sql`${parking[item[1]]} < ${dateIsoToDatetime(item[2])}`);
      }

      if (item[0] === 'gt') {
        args.push(sql`${parking[item[1]]} > ${dateIsoToDatetime(item[2])}`);
      }

      if (item[0] === 'between') {
        args.push(
          sql`${parking[item[1]]} BETWEEN ${dateIsoToDatetime(item[2])} AND ${dateIsoToDatetime(item[3])}`,
        );
      }
    }
  });

  return args;
};

const convertBodyToQBuilder = (
  and: ParkingListSchema,
): SQL<unknown>[] | null => {
  const args: (SQL<unknown> | undefined)[] = [];

  const orOps = and.filter((item) => item[0] === 'or');

  if (orOps.length) {
    const orArgs = mapOperations(orOps[0][1] as ParkingListSchema);

    args.push(or(...orArgs));
  }

  const restArgs = mapOperations(and);

  args.push(...restArgs);

  const filteredArgs = args.filter((item) => typeof item !== 'undefined');

  if (filteredArgs.length === 0) {
    return null;
  }

  return filteredArgs as SQL<unknown>[];
};

export default convertBodyToQBuilder;
