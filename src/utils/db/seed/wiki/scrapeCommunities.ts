import * as cheerio from 'cheerio';
import path from 'path';

import { logger } from '@/services';
import { axios } from '@/utils';

const url = 'https://en.wikipedia.org/wiki/List_of_neighbourhoods_in_Calgary';

export type ScrapedCommunity = {
  name: string;
  url: string;
  quadrant: string;
  sector: string;
  ward: string;
  type: string;
  population: number;
  dwellings: number;
  area: string;
  density: string;
};

const fail = (message: string) => {
  logger.error(`[WIKI SCRAPER] ${message}`);
  throw new Error('Wiki communities scraper error');
};

const scrapeCommunities = async () => {
  try {
    const communities: ScrapedCommunity[] = [];
    const response = await axios.get(url);

    if (!response || !response.data) {
      fail('axios response empty');
    }

    logger.info('[WIKI SCRAPER] axios response success');

    const $ = cheerio.load(response.data);

    const trs = $('table.wikitable.sortable');

    if (!trs || !trs.length) {
      fail('trs not found');
    }

    $('table.wikitable.sortable tbody tr').each((i, elem) => {
      const tds = $(elem).find('td');

      if (!tds.length) {
        return;
      }

      const community: ScrapedCommunity = {
        name: '',
        url: '',
        quadrant: '',
        sector: '',
        ward: '',
        type: '',
        population: 0,
        dwellings: 0,
        area: '',
        density: '',
      };

      tds.each((j, td) => {
        if (j === 0) {
          const a = $(td).find('a');

          if (a) {
            community.name = $(a).text();
            community.url = `https://en.wikipedia.org${$(a).attr('href')}`;
          } else {
            community.name = $(td).text();
          }
        }

        if (j === 1) {
          community.quadrant = $(td).text();
        }

        if (j === 2) {
          community.sector = $(td).text();
        }

        if (j === 3) {
          community.ward = $(td).text();
        }

        if (j === 4) {
          community.type = $(td).text();
        }

        if (j === 6) {
          community.population = parseInt($(td).text().replace(/,/g, ''));
        }

        if (j === 9) {
          community.dwellings = parseInt($(td).text().replace(/,/g, ''));
        }

        if (j === 10) {
          community.area = `${parseFloat($(td).text().replace(/,/g, ''))}`;
        }

        if (j === 11) {
          community.density = `${parseFloat($(td).text().replace(/,/g, ''))}`;
        }
      });

      if (
        community.name &&
        community.type &&
        community.population &&
        community.dwellings &&
        community.area &&
        community.density
      ) {
        communities.push(community);
      }
    });

    if (communities.length) {
      await Bun.write(
        path.join(
          process.cwd(),
          'src',
          'utils',
          'db',
          'seed',
          'communities.json',
        ),
        JSON.stringify(communities, null, 2),
      );

      logger.info('[WIKI SCRAPER] wiki communities scraper success');
    } else {
      fail('communities arrray empty');
    }
  } catch (error) {
    logger.error('[WIKI SCRAPER] wiki communities scraper error', error);
    throw new Error('Wiki communities scraper error');
  }
};

await scrapeCommunities();
