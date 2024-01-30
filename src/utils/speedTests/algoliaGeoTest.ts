/* eslint-disable no-console */
import { index } from '@/algolia';
import { testPoint } from '@/constants';

const start = performance.now();

const searchOptions = {
  analytics: false,
  aroundLatLng: `${testPoint.latitude},${testPoint.longitude}`,
  aroundRadius: 1000,
  attributesToRetrieve: ['*'],
  attributesToSnippet: ['*:20'],
  enableABTest: false,
  explain: ['*'],
  facets: ['*'],
  getRankingInfo: true,
  hitsPerPage: 50,
  maxValuesPerFacet: 100,
  page: 0,
  responseFields: ['*'],
  snippetEllipsisText: '…',
};

index.search('Crescent', searchOptions).then(({ hits }) => {
  const duration = performance.now() - start;

  console.log(`====================================`);
  console.log('ALGOLIA GEOSPATIAL QUERY TEST RESULT');
  console.log(`====================================`);
  console.log(`Result number of rows: ${hits.length}`);
  console.log(`Duration: ${Math.round(duration)} ms`);
});
