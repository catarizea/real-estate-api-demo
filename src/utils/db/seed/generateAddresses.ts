/* eslint-disable no-console */
import { faker } from '@faker-js/faker';
import type { Entry } from 'node-geocoder';

import { db } from '@/models';
import { seedAddress } from '@/models/schema';
import { Address, Point } from '@/types';
import { delay, getAddressByCoordinates } from '@/utils';

const origin: [latitude: number, longitude: number] = [51.0334, -114.05424];
const city = 'Calgary';
const delayTime = 2000;
const batchSize = 10;

const generateAddresses = async () => {
  const addresses = [...Array(batchSize).keys()].map(
    async (index): Promise<Address | null> => {
      await delay(delayTime * index);

      console.log(`delayed ${index} ${delayTime * index} ms`);

      const c = faker.location.nearbyGPSCoordinate({
        origin,
        radius: 16,
        isMetric: true,
      });

      const point: Point = {
        latitude: c[0],
        longitude: c[1],
      };

      const result = await getAddressByCoordinates(point);

      if (!result || !result.length) {
        return null;
      }

      const a: Entry = result[0];

      if (
        !a ||
        !a.city ||
        a.city !== city ||
        !a.streetNumber ||
        !a.streetName ||
        !a.zipcode
      ) {
        return null;
      }

      return a as Address;
    },
  );

  return Promise.all(addresses);
};

const addresses = await generateAddresses();

const values = [];

for (const a of addresses) {
  if (!a) {
    continue;
  } else {
    if (
      !a.formattedAddress ||
      !a.streetNumber ||
      !a.streetName ||
      !a.zipcode ||
      !a.city ||
      !a.extra?.neighborhood ||
      !a.administrativeLevels?.level1long ||
      !a.administrativeLevels?.level1short ||
      !a.country ||
      !a.latitude ||
      !a.longitude
    ) {
      continue;
    }

    values.push({
      address: a.formattedAddress,
      streetNumber: a.streetNumber,
      streetName: a.streetName,
      neighborhood: a.extra?.neighborhood,
      zipCode: a.zipcode,
      city: a.city,
      administrativeLong: a.administrativeLevels?.level1long,
      administrativeShort: a.administrativeLevels?.level1short,
      country: a.country,
      latitude: `${a.latitude}`,
      longitude: `${a.longitude}`,
    });
  }
}

console.log(values);

await db.insert(seedAddress).values(values);
