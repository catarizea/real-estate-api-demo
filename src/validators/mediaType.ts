export const mediaTypeBodySchemaExample = {
  and: [
    [
      'or',
      [
        ['eq', 'name', 'video'],
        ['eq', 'name', 'image'],
      ],
    ],
    [
      'between',
      'createdAt',
      '2024-01-23T00:00:00.000Z',
      '2024-02-12T00:00:00.000Z',
    ],
  ],
};
