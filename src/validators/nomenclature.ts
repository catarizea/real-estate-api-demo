export const bodyNomenclatureListSchemaExample = {
  and: [
    [
      'or',
      [
        ['eq', 'name', '3+'],
        ['eq', 'name', '2.5'],
      ],
    ],
    ['eq', 'order', 1],
    ['lt', 'createdAt', '2024-01-01T00:00:00.000Z'],
    ['gt', 'updatedAt', '2024-01-01T00:00:00.000Z'],
    [
      'between',
      'createdAt',
      '2024-01-01T00:00:00.000Z',
      '2024-01-02T00:00:00.000Z',
    ],
  ],
};
