import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  `${process.env.ALGOLIA_APP_ID}`,
  `${process.env.ALGOLIA_ADMIN_API_KEY}`,
);

export const index = client.initIndex('property_units');
