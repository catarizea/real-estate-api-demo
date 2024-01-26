import { faker } from '@faker-js/faker';
import { createId } from '@paralleldrive/cuid2';
import { eq, gt } from 'drizzle-orm';

import { dbSeedPrefix } from '@/constants';
import { db } from '@/models';
import {
  bathroom,
  bedroom,
  city,
  floorPlan,
  parking,
  property,
  seedAddress,
  typeProp,
  unit,
} from '@/models/schema';
import { logger } from '@/services';
import {
  Cursor,
  CursorArgs,
  NewFloorPlan,
  NewParking,
  NewProperty,
  NewUnit,
} from '@/types';
import { BatchWriter } from '@/utils';
import {
  getBooleanFeature,
  getFee,
  getFloorPlan,
  getParkingOptions,
  getPropertyDescription,
  getPropertyRent,
  getPropertySurface,
  getPropertyTypeIndex,
  getUnitNumbers,
} from '@/utils/db/seed/distribution';

const batchSize = 50;

type Args = {
  cursor: Cursor;
  setCursor: ({ cursor, hasMore }: CursorArgs) => void;
  communitiesIds: { [key: string]: string };
};

const loadProperty = async ({
  cursor,
  setCursor,
  communitiesIds,
}: Args): Promise<void> => {
  if (!cursor.hasMore) {
    logger.info(`${dbSeedPrefix} properties already loaded`);
    return;
  }

  const cities = await db.select().from(city).where(eq(city.name, 'Calgary'));

  if (!cities || !cities.length || !cities[0].id) {
    logger.error(`${dbSeedPrefix} Calgary not found`);
    process.exit(1);
  }

  const cityId = cities[0].id;

  const typePropIds = await db
    .select({ id: typeProp.id })
    .from(typeProp)
    .orderBy(typeProp.order);

  if (!typePropIds || !typePropIds.length) {
    logger.error(`${dbSeedPrefix} No property types found`);
    process.exit(1);
  }

  const bedroomIds = await db
    .select({ id: bedroom.id })
    .from(bedroom)
    .orderBy(bedroom.order);

  if (!bedroomIds || !bedroomIds.length) {
    logger.error(`${dbSeedPrefix} No bedroom types found`);
    process.exit(1);
  }

  const bathroomIds = await db
    .select({ id: bathroom.id })
    .from(bathroom)
    .orderBy(bathroom.order);

  if (!bathroomIds || !bathroomIds.length) {
    logger.error(`${dbSeedPrefix} No bathroom types found`);
    process.exit(1);
  }

  const fields = {
    id: seedAddress.id,
    address: seedAddress.address,
    latitude: seedAddress.latitude,
    longitude: seedAddress.longitude,
    community: seedAddress.neighborhood,
  };

  const seedAddresses = cursor
    ? await db
        .select(fields)
        .from(seedAddress)
        .orderBy(seedAddress.id)
        .where(gt(seedAddress.id, cursor.cursor))
        .limit(batchSize)
    : await db
        .select(fields)
        .from(seedAddress)
        .orderBy(seedAddress.id)
        .limit(batchSize);

  if (!seedAddresses || !seedAddresses.length) {
    logger.error(`${dbSeedPrefix} No more seed addresses found`);
    return;
  }

  if (seedAddresses.length < batchSize) {
    setCursor({
      cursor: seedAddresses[seedAddresses.length - 1].id,
      hasMore: false,
      type: 'property',
    });
  } else {
    setCursor({
      cursor: seedAddresses[seedAddresses.length - 1].id,
      hasMore: true,
      type: 'property',
    });
  }

  const propertyWriter = new BatchWriter<typeof property, NewProperty>({
    model: property,
    batchSize: 20,
  });

  const floorPlanWriter = new BatchWriter<typeof floorPlan, NewFloorPlan>({
    model: floorPlan,
    batchSize: 20,
  });

  const unitWriter = new BatchWriter<typeof unit, NewUnit>({
    model: unit,
    batchSize: 20,
  });

  const parkingWriter = new BatchWriter<typeof parking, NewParking>({
    model: parking,
    batchSize: 20,
  });

  seedAddresses.forEach(async (s) => {
    const description = getPropertyDescription();

    if (!s.community || !communitiesIds[s.community]) {
      logger.error(
        `${dbSeedPrefix} Community ${s.community} not found in communitiesIds, skipping`,
      );
      return;
    }

    const propertyTypeIndex = getPropertyTypeIndex();

    const cats = getBooleanFeature('cats');
    const dogs = getBooleanFeature('dogs');

    const newProperty: NewProperty = {
      id: createId(),
      name: faker.company.name(),
      descriptionTitle: description.title,
      descriptionSubtitle: description.subtitle,
      descriptionText: description.text,
      yearBuilt: faker.date.past({ years: 20 }).getFullYear(),
      address: s.address,
      latitude: s.latitude,
      longitude: s.longitude,
      cityId,
      typePropId: typePropIds[propertyTypeIndex].id,
      communityId: communitiesIds[s.community],
      smoking: getBooleanFeature('smoking'),
      cats,
      dogs,
      paidSearchRanking: getBooleanFeature('paidSearchRanking'),
      published: true,
    };

    if (cats || dogs) {
      newProperty.petsNegotiable = getBooleanFeature('petsNegotiable');
      newProperty.petsFee = getFee('pets');
      newProperty.petsFeeInterval = 'monthly';
    }

    propertyWriter.load(newProperty);

    const floorPlans = getFloorPlan();

    if (!floorPlans || !floorPlans.length) {
      logger.error(`${dbSeedPrefix} No floor plans found`);
      process.exit(1);
    }

    const unitNumbers = getUnitNumbers(floorPlans);

    floorPlans.forEach((f, idx) => {
      const newFloorPlan: NewFloorPlan = {
        id: createId(),
        name: `Floor Plan ${idx + 1}`,
        propertyId: newProperty.id,
        order: idx,
      };

      floorPlanWriter.load(newFloorPlan);

      [...Array(f.units).keys()].forEach((i) => {
        const rent = getPropertyRent(propertyTypeIndex);

        const newUnit: NewUnit = {
          id: createId(),
          name: unitNumbers ? `Unit ${unitNumbers[idx][i]}` : `Unit ${i + 1}`,
          propertyId: newProperty.id,
          floorPlanId: newFloorPlan.id,
          rent,
          deposit: rent,
          shortterm: getBooleanFeature('shortterm'),
          longterm: getBooleanFeature('longterm'),
          surface: getPropertySurface(propertyTypeIndex),
          furnished: getBooleanFeature('furnished'),
          bedroomId:
            bedroomIds[faker.number.int({ min: 0, max: bedroomIds.length - 1 })]
              .id,
          bathroomId:
            bathroomIds[
              faker.number.int({ min: 0, max: bathroomIds.length - 1 })
            ].id,
          heat: getBooleanFeature('heat'),
          water: getBooleanFeature('water'),
          electricity: getBooleanFeature('electricity'),
          internet: getBooleanFeature('internet'),
          television: getBooleanFeature('television'),
          order: i,
          published: true,
        };

        if (unitNumbers) {
          newUnit.unitNumber = `${unitNumbers[idx][i]}`;
        }

        unitWriter.load(newUnit);
      });
    });

    const parkingOptions = getParkingOptions();

    if (!parkingOptions || !parkingOptions.length) {
      logger.error(`${dbSeedPrefix} No parking options found`);
      process.exit(1);
    }

    parkingOptions.forEach((p, idex) => {
      const newParking: NewParking = {
        id: createId(),
        name: p,
        propertyId: newProperty.id,
        fee: getFee('parking'),
        feeInterval: 'monthly',
        order: idex,
      };

      parkingWriter.load(newParking);
    });
  });

  await propertyWriter.execute();

  await floorPlanWriter.execute();

  await unitWriter.execute();

  await parkingWriter.execute();

  logger.info(`${dbSeedPrefix} properties batch of ${batchSize} items loaded`);
};

export default loadProperty;
