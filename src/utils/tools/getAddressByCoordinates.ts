import type { Entry } from 'node-geocoder';
import NodeGeocoder from 'node-geocoder';

import { logger } from '@/services';
import { Point } from '@/types';

const geocoder = NodeGeocoder({
  provider: 'google' as const,
  apiKey: `${process.env.GCLOUD_API_KEY}`,
});

const getAddressByCoordinates = async ({
  latitude,
  longitude,
}: Point): Promise<Entry[]> => {
  try {
    const result = await geocoder.reverse({ lat: latitude, lon: longitude });
    return result;
  } catch (error) {
    logger.error('[GOOGLE MAPS] geocode reverse error', error);

    throw new Error('Geocode reverse error');
  }
};

export default getAddressByCoordinates;
