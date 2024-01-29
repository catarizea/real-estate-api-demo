/* eslint-disable no-console */
import { index } from '@/algolia';

const searchOptions = {
  analytics: false,
  attributesToRetrieve: ['*'],
  attributesToSnippet: ['*:20'],
  enableABTest: false,
  facetFilters: [['bedroom:2 Beds'], ['parking:Underground']],
  facets: ['*'],
  hitsPerPage: 100,
  maxValuesPerFacet: 100,
  numericFilters: ['rent>=1000', 'rent<=1200'],
  page: 0,
  responseFields: ['*'],
  snippetEllipsisText: '…',
};

const start = performance.now();

index.search('', searchOptions).then(({ hits }) => {
  const duration = performance.now() - start;

  console.log(`===================`);
  console.log('ALGOLIA TEST RESULT');
  console.log(`===================`);
  console.log(`Result number of rows: ${hits.length}`);

  console.log(`Duration: ${Math.round(duration)} ms`);
});
