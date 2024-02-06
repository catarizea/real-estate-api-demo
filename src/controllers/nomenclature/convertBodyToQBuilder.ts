import { eq, gt, lt, or, SQL, sql } from 'drizzle-orm';

import { NomenclatureModel } from '@/types';
import { dateIsoToDatetime } from '@/utils';
import { NomenclatureListSchema } from '@/validators';

const mapOperations = (
  ops: NomenclatureListSchema,
  model: NomenclatureModel,
) => {
  const args: (SQL<unknown> | undefined)[] = [];

  ops.forEach((item) => {
    if (item[0] === 'eq') {
      args.push(eq(model[item[1]], item[2]));
    }

    if (item[0] === 'lt' && item[1] === 'order') {
      args.push(lt(model[item[1]], item[2]));
    }

    if (item[0] === 'gt' && item[1] === 'order') {
      args.push(gt(model[item[1]], item[2]));
    }

    if (item[1] === 'createdAt' || item[1] === 'updatedAt') {
      if (item[0] === 'lt') {
        args.push(sql`${model[item[1]]} < ${dateIsoToDatetime(item[2])}`);
      }

      if (item[0] === 'gt') {
        args.push(sql`${model[item[1]]} > ${dateIsoToDatetime(item[2])}`);
      }

      if (item[0] === 'between') {
        args.push(
          sql`${model[item[1]]} BETWEEN ${dateIsoToDatetime(item[2])} AND ${dateIsoToDatetime(item[3])}`,
        );
      }
    }
  });

  return args;
};

const convertBodyToQBuilder = (
  and: NomenclatureListSchema,
  model: NomenclatureModel,
): SQL<unknown>[] | null => {
  const args: (SQL<unknown> | undefined)[] = [];

  const orOps = and.filter((item) => item[0] === 'or');

  if (orOps.length) {
    const orArgs = mapOperations(orOps[0][1] as NomenclatureListSchema, model);

    args.push(or(...orArgs));
  }

  const restArgs = mapOperations(and, model);

  args.push(...restArgs);

  const filteredArgs = args.filter((item) => typeof item !== 'undefined');

  if (filteredArgs.length === 0) {
    return null;
  }

  return filteredArgs as SQL<unknown>[];
};

export default convertBodyToQBuilder;
