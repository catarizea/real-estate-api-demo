import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';

import { logger } from '@/services';
import { Point } from '@/types';

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const getCoordinates = async (url: string): Promise<Point> => {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const elems = $('.toccolours.plainlinks table td span.geo.h-geo span');

    if (!elems || !elems.length || elems.length < 2) {
      logger.error(
        '[GEOHACK SCRAPER] geohack coordinates scraper error',
        'Could not find coordinates element',
      );
      throw new Error('Geohack coordinates scraper error');
    }

    const point = {
      latitude: parseFloat($(elems[0]).text()),
      longitude: parseFloat($(elems[1]).text()),
    };

    logger.info('[GEOHACK SCRAPER] geohack coordinates scraper success');

    return point;
  } catch (error) {
    logger.error('[GEOHACK SCRAPER] geohack coordinates scraper error', error);
    throw new Error('Geohack coordinates scraper error');
  }
};

export default getCoordinates;
