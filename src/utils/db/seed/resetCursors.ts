import path from 'path';

import { algoliaSeedPrefix, dbSeedPrefix } from '@/constants';
import { logger } from '@/services';
import { ScrapedCommunity } from '@/utils/db/seed/wiki/scrapeCommunities';

const rootFolder = path.join(process.cwd(), 'src', 'utils', 'db', 'seed');
const loadRoot = path.join(rootFolder, 'load');

const loadCursor = {
  cursor: '',
  hasMore: true,
};

const wikiCursor = {
  cursor: 0,
};

const restLoaded = {
  loaded: false,
};

const communities: ScrapedCommunity[] = [];

await Bun.write(
  path.join(rootFolder, 'wiki', 'communities.json'),
  JSON.stringify(communities, null, 2),
);

await Bun.write(
  path.join(rootFolder, 'wiki', 'cursor.json'),
  JSON.stringify(wikiCursor, null, 2),
);

logger.info(`${dbSeedPrefix} success reset wiki communities scraping cursors`);

await Bun.write(
  path.join(rootFolder, 'algolia', 'cursor.json'),
  JSON.stringify(loadCursor, null, 2),
);

logger.info(
  `${algoliaSeedPrefix} success reset algolia property unit objects cursor`,
);

await Bun.write(
  path.join(loadRoot, 'rest', 'loaded.json'),
  JSON.stringify(restLoaded, null, 2),
);

logger.info(`${dbSeedPrefix} success reset taxonomies loaded cursor`);

await Bun.write(
  path.join(loadRoot, 'buildingFeature', 'cursor.json'),
  JSON.stringify(loadCursor, null, 2),
);

logger.info(`${dbSeedPrefix} success reset buildingFeature cursor`);

await Bun.write(
  path.join(loadRoot, 'feature', 'cursor.json'),
  JSON.stringify(loadCursor, null, 2),
);

logger.info(`${dbSeedPrefix} success reset property unit feature cursor`);

await Bun.write(
  path.join(loadRoot, 'media', 'cursor.json'),
  JSON.stringify({ ...loadCursor, iteration: 0 }, null, 2),
);

logger.info(`${dbSeedPrefix} success reset property media cursor`);

await Bun.write(
  path.join(loadRoot, 'property', 'cursor.json'),
  JSON.stringify(loadCursor, null, 2),
);

logger.info(`${dbSeedPrefix} success reset property cursor`);

logger.info(`${dbSeedPrefix} success all cursors reset`);

process.exit(0);
