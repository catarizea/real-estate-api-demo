import { postmanIds } from '@/constants';

export const cityBodySchemaExample = {
  and: [
    [
      'or',
      [
        ['eq', 'name', 'Toronto'],
        ['eq', 'name', 'Ottawa'],
        ['eq', 'name', 'Mississauga'],
      ],
    ],
    ['eq', 'regionId', postmanIds.region],
  ],
};
