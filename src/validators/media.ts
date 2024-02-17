import { postmanIds } from '@/constants';

export const mediaBodySchemaExample = {
  and: [
    [
      'or',
      [
        ['eq', 'assetId', 'a344xpp1'],
        ['eq', 'assetId', 'a344xpp2'],
      ],
    ],
    ['eq', 'mediaTypeId', postmanIds.mediaType],
    [
      'between',
      'createdAt',
      '2024-01-23T00:00:00.000Z',
      '2024-02-12T00:00:00.000Z',
    ],
  ],
};
