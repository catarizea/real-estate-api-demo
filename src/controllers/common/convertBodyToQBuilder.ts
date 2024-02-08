import { between, eq, gt, lt, or, SQL, sql } from 'drizzle-orm';

import { CommonItemListSchema, CommonModel, ModelField } from '@/types';
import { dateIsoToDatetime } from '@/utils';

const mapOperations = (
  model: CommonModel,
  ops: CommonItemListSchema,
  fields: ModelField,
) => {
  const args: (SQL<unknown> | undefined)[] = [];

  ops.forEach((item) => {
    if (
      item[0] === 'eq' &&
      (fields.id.includes(item[1]) ||
        fields.string.includes(item[1]) ||
        fields.numeric.includes(item[1]) ||
        fields.tinyInt.includes(item[1]) ||
        fields.decimal.includes(item[1]))
    ) {
      args.push(eq(model[item[1]], item[2]));
    }

    if (item[0] === 'lt' && fields.numeric.includes(item[1])) {
      args.push(lt(model[item[1]], parseInt(`${item[2]}`)));
    }

    if (item[0] === 'lt' && fields.decimal.includes(item[1])) {
      args.push(lt(model[item[1]], parseFloat(`${item[2]}`)));
    }

    if (item[0] === 'gt' && fields.numeric.includes(item[1])) {
      args.push(gt(model[item[1]], parseInt(`${item[2]}`)));
    }

    if (item[0] === 'gt' && fields.decimal.includes(item[1])) {
      args.push(gt(model[item[1]], parseFloat(`${item[2]}`)));
    }

    if (item[0] === 'between' && fields.numeric.includes(item[1])) {
      args.push(
        between(model[item[1]], parseInt(`${item[2]}`), parseInt(`${item[3]}`)),
      );
    }

    if (item[0] === 'between' && fields.decimal.includes(item[1])) {
      args.push(
        between(
          model[item[1]],
          parseFloat(`${item[2]}`),
          parseFloat(`${item[3]}`),
        ),
      );
    }

    if (item[0] === 'lt' && fields.datetime.includes(item[1])) {
      args.push(sql`${model[item[1]]} < ${dateIsoToDatetime(`${item[2]}`)}`);
    }

    if (item[0] === 'gt' && fields.datetime.includes(item[1])) {
      args.push(sql`${model[item[1]]} > ${dateIsoToDatetime(`${item[2]}`)}`);
    }

    if (item[0] === 'between' && fields.datetime.includes(item[1])) {
      args.push(
        sql`${model[item[1]]} BETWEEN ${dateIsoToDatetime(`${item[2]}`)} AND ${dateIsoToDatetime(`${item[3]}`)}`,
      );
    }

    if (item[0] === 'lt' && fields.dateOnly.includes(item[1])) {
      args.push(sql`${model[item[1]]} < ${item[2]}`);
    }

    if (item[0] === 'gt' && fields.dateOnly.includes(item[1])) {
      args.push(sql`${model[item[1]]} > ${item[2]}`);
    }

    if (item[0] === 'between' && fields.dateOnly.includes(item[1])) {
      args.push(sql`${model[item[1]]} BETWEEN ${item[2]} AND ${item[3]}`);
    }
  });

  return args;
};

const convertBodyToQBuilder = (
  model: CommonModel,
  and: CommonItemListSchema,
  fields: ModelField,
): SQL<unknown>[] | null => {
  const args: (SQL<unknown> | undefined)[] = [];

  const orOps = and.filter((item) => item[0] === 'or');

  if (orOps.length) {
    const orArgs = mapOperations(
      model,
      orOps[0][1] as CommonItemListSchema,
      fields,
    );

    args.push(or(...orArgs));
  }

  const restArgs = mapOperations(model, and, fields);

  args.push(...restArgs);

  const filteredArgs = args.filter((item) => typeof item !== 'undefined');

  if (filteredArgs.length === 0) {
    return null;
  }

  return filteredArgs as SQL<unknown>[];
};

export default convertBodyToQBuilder;
