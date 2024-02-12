export const cityBodySchemaExample = {
  and: [
    [
      'or',
      ['eq', 'name', 'Toronto'],
      ['eq', 'name', 'Ottawa'],
      ['eq', 'name', 'Mississauga'],
    ],
    ['eq', 'regionId', 'atgl5rbiijouz9695d01vpne'],
  ],
};
