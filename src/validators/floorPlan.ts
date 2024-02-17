import { postmanIds } from '@/constants';

export const floorPlanBodySchemaExample = {
  and: [
    [
      'or',
      [
        ['eq', 'name', 'Floor Plan 1'],
        ['eq', 'name', 'Floor Plan 2'],
      ],
    ],
    ['eq', 'propertyId', postmanIds.property],
  ],
};
