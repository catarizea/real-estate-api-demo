import intersection from 'lodash.intersection';

const hasStatusNameBody = (err: unknown): boolean =>
  typeof err === 'object' &&
  intersection(Object.keys(err as object), ['status', 'name', 'body'])
    .length === 3;

export default hasStatusNameBody;
