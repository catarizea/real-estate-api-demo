import algoliasearch from 'algoliasearch';

export const client = algoliasearch(
  `${process.env.ALGOLIA_APP_ID}`,
  `${process.env.ALGOLIA_ADMIN_KEY}`,
);

export const index = client.initIndex('property_units');
