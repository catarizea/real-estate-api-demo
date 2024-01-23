/* eslint-disable no-console */

import { createId } from '@paralleldrive/cuid2';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import omit from 'lodash.omit';
import SqlString from 'sqlstring';

import { db } from '@/models';
import { community } from '@/models/schema';
import { logger } from '@/services';
import { delay } from '@/utils';

import communities from './communities.json';
import type { ScrapedCommunity } from './scrapeCommunities';
import scrapeGeohackCoords from './scrapeGeohackCoords';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const delayTime = 5000;
const batchSize = 10;
const reg = /\[[a-zA-Z0-9]*\]/gim;
const cityId = createId();

type ScrapedCommunityRest = {
  description: string;
  latitude: string;
  longitude: string;
  averageIncome?: number;
  elevation?: number;
  established?: number;
  cityId: string;
};

const extractInfo = ($: cheerio.CheerioAPI, tr: cheerio.Element) => {
  const th = $(tr).find('th');

  if (!th || !th.length) {
    return null;
  }

  const text = $(th).text().replace(reg, '');

  if (!text) {
    return null;
  }

  const td = $(tr).find('td');

  if (!td || !td.length) {
    return null;
  }

  const value = $(td).text().replace(reg, '');

  if (!value) {
    return null;
  }

  if (text.toLowerCase().indexOf('average income') !== -1) {
    return {
      averageIncome: parseInt(value.replace(/,/g, '').replace('$', ''), 10),
    };
  }

  if (text.toLowerCase().indexOf('elevation') !== -1) {
    return {
      elevation: parseInt(value.replace(/,/g, ''), 10),
    };
  }

  if (text.toLowerCase().indexOf('established') !== -1) {
    return {
      established: parseInt(value.replace(/,/g, ''), 10),
    };
  }

  return null;
};

const fail = (name: string, error: string) => {
  logger.error(
    `[COMMUNITY SCRAPER] community scraper error for ${name}`,
    error,
  );
  throw new Error('Community scraper error');
};

type ScrapedCommunityComplete = Omit<ScrapedCommunity, 'url'> &
  ScrapedCommunityRest;

const scrapeAll = async () => {
  const commPromises = communities.map(
    async (c: ScrapedCommunity, index): Promise<ScrapedCommunityComplete> => {
      await delay(delayTime * index);

      console.log(`delayed ${index} ${(delayTime * index) / 1000} s`);

      const response = await axios.get(c.url);

      const $ = cheerio.load(response.data);

      const ct = $('.mw-content-ltr.mw-parser-output');

      if (!ct || !ct.length) {
        fail(c.name, 'Could not find content element');
      }

      const elems = ct.find('p, h2');

      if (!elems || !elems.length) {
        fail(c.name, 'Could not find elements inside content');
      }

      let rest: ScrapedCommunityRest = {
        description: '',
        latitude: '',
        longitude: '',
        cityId,
      };

      let description = '';
      let stop = false;

      elems.each((i, elem) => {
        if (!stop && $(elem).is('p')) {
          description = `${description}

${$(elem).text().replace(reg, '')}`;
        }

        if (!stop && $(elem).is('h2')) {
          const text = $(elem).text().replace(reg, '');

          if (text.toLowerCase().indexOf('see also') !== -1) {
            stop = true;
          } else {
            description = `${description}
  
### ${text}`;
          }
        }
      });

      rest.description = SqlString.escape(description);

      const geoDefault = $('.geo-default');

      if (!geoDefault || !geoDefault.length) {
        fail(c.name, 'Could not find geo-default element');
      }

      const geoParent = $(geoDefault[0]).parent();

      if (
        !geoParent ||
        !geoParent.is('a') ||
        !geoParent.hasClass('external') ||
        !geoParent.attr('href')
      ) {
        fail(c.name, 'Could not find geo-default parent element');
      }

      const coordsUrl = geoParent.attr('href');

      if (!coordsUrl) {
        fail(c.name, 'Could not find geo-default parent href');
      } else {
        const coords = await scrapeGeohackCoords(coordsUrl);

        if (!coords || !coords.latitude || !coords.longitude) {
          fail(c.name, 'Could not find coordinates based on url');
        }

        rest.latitude = `${coords.latitude}`;
        rest.longitude = `${coords.longitude}`;
      }

      const trs = $('.infobox.vcard tr');

      if (trs && trs.length) {
        trs.each((i, tr) => {
          const info = extractInfo($, tr);

          if (info) {
            rest = {
              ...rest,
              ...info,
            };
          }
        });
      }

      return {
        ...omit(c, ['url']),
        ...rest,
      };
    },
  );

  return Promise.all(commPromises);
};

const completeCommunities = await scrapeAll();

console.log(completeCommunities);

completeCommunities.forEach(async (c, index) => {
  let values: ScrapedCommunityComplete[] = [];
  values.push(c);

  if (
    index === completeCommunities.length - 1 ||
    (index > 0 && index % batchSize === 0)
  ) {
    await db.insert(community).values(values);
    values = [];
  }
});
