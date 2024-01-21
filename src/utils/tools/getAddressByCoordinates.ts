import type { Entry } from 'node-geocoder';
import NodeGeocoder from 'node-geocoder';

import { Point } from '@/types';

const options = {
  provider: 'google' as const,
  apiKey: `${process.env.GOOGLE_MAPS_API_KEY}`,
};

const geocoder = NodeGeocoder(options);

const getAddressByCoordinates = async ({
  latitude,
  longitude,
}: Point): Promise<Entry[]> => {
  try {
    const result = await geocoder.reverse({ lat: latitude, lon: longitude });
    return result;
  } catch (_) {
    throw new Error('Error getting address by coordinates');
  }
};

export default getAddressByCoordinates;
