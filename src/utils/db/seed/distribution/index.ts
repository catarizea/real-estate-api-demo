import { faker } from '@faker-js/faker';

type FloorPlan = {
  units: number;
}[];

type FloorUnitsNumbers = number[][];

export const floorPlans = [
  [{ units: 1 }],
  [{ units: 2 }],
  [{ units: 3 }],
  [{ units: 2 }, { units: 3 }],
  [{ units: 4 }, { units: 2 }, { units: 1 }],
  [{ units: 2 }, { units: 1 }, { units: 6 }],
  [{ units: 1 }, { units: 4 }, { units: 3 }, { units: 2 }],
  [{ units: 2 }, { units: 3 }, { units: 4 }, { units: 1 }],
  [{ units: 1 }, { units: 5 }, { units: 2 }, { units: 1 }, { units: 2 }],
  [{ units: 6 }, { units: 3 }, { units: 5 }, { units: 4 }, { units: 3 }],
];

export const distribution = [35, 15, 10, 9, 7, 6, 6, 6, 4, 2];

export const cumulative = [35, 50, 60, 69, 76, 82, 88, 94, 98, 100];

export const getFloorPlan = () => {
  const percent = faker.number.int({ min: 1, max: 100 });
  const index = cumulative.findIndex((c) => c >= percent);
  return floorPlans[index];
};

export const getUnitNumbers = (
  floorPlan: FloorPlan,
): FloorUnitsNumbers | undefined => {
  if (floorPlan.length === 1 && floorPlan[0].units === 1) {
    return undefined;
  }

  return floorPlan.map((plan, planIndex): number[] => {
    const indexes = [...Array(plan.units).keys()];
    const randomStart = faker.number.int({
      min: 0,
      max: 10 * planIndex + plan.units,
    });
    return indexes.map((i) => i + randomStart);
  });
};

export const getRandomFeatures = (
  taxonomyIds: string[],
  maxFeatures: number,
) => {
  const validMaxFeatures =
    maxFeatures > taxonomyIds.length ? taxonomyIds.length : maxFeatures;
  const limit = faker.number.int({ min: 1, max: validMaxFeatures });

  // ids are random strings, so sorting is a good shuffle
  const randomOrderedTaxonomyIds = taxonomyIds.sort();

  const indexes = [...Array(limit).keys()].map(() =>
    faker.number.int({ min: 0, max: taxonomyIds.length - 1 }),
  );

  return indexes.map((i) => randomOrderedTaxonomyIds[i]);
};

export const smokingDistribution = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
];

export const catsDistribution = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
];

export const dogsDistribution = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
];

export const shorttermDistribution = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
];

export const longtermDistribution = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
];

export const furnishedDistribution = [
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
];

export const heatDistribution = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  false,
];

export const waterDistribution = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
];

export const electricityDistribution = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
];

export const internetDistribution = [
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
];

export const televisionDistribution = [
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

export const paidSearchRankingDistribution = [
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
];

export const petsNegotiableDistribution = [
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
];

export const getBooleanFeature = (
  type:
    | 'smoking'
    | 'cats'
    | 'dogs'
    | 'shortterm'
    | 'longterm'
    | 'furnished'
    | 'heat'
    | 'water'
    | 'electricity'
    | 'internet'
    | 'television'
    | 'paidSearchRanking'
    | 'petsNegotiable',
): boolean | undefined => {
  const pos = faker.number.int({ min: 1, max: 10 });

  let distribution: boolean[] | undefined;

  if (type === 'smoking') {
    distribution = smokingDistribution;
  } else if (type === 'dogs') {
    distribution = dogsDistribution;
  } else if (type === 'cats') {
    distribution = catsDistribution;
  } else if (type === 'shortterm') {
    distribution = shorttermDistribution;
  } else if (type === 'longterm') {
    distribution = longtermDistribution;
  } else if (type === 'furnished') {
    distribution = furnishedDistribution;
  } else if (type === 'heat') {
    distribution = heatDistribution;
  } else if (type === 'water') {
    distribution = waterDistribution;
  } else if (type === 'electricity') {
    distribution = electricityDistribution;
  } else if (type === 'internet') {
    distribution = internetDistribution;
  } else if (type === 'television') {
    distribution = televisionDistribution;
  } else if (type === 'paidSearchRanking') {
    distribution = paidSearchRankingDistribution;
  } else if (type === 'petsNegotiable') {
    distribution = petsNegotiableDistribution;
  }

  if (!distribution) {
    return undefined;
  }

  return distribution[pos - 1];
};

export const propertySurfaceIntervals: number[][] = [
  [1500, 3500], // Acreage
  [600, 1000], // Apartment
  [500, 1000], // Basement
  [600, 1000], // Condo Unit
  [900, 1800], // Duplex
  [900, 2500], // House
  [500, 1700], // Loft
  [900, 2300], // Main Floor
  [150, 300], // Mobile
  [1500, 3500], // Office Space
  [270, 1000], // Parking Spot
  [150, 800], // Room for Rent
  [270, 1000], // Storage
  [900, 1600], // Townhouse
  [900, 1600], // Vacation Home
];

export const getPropertySurface = (index: number): number => {
  const [min, max] = propertySurfaceIntervals[index];
  return faker.number.int({ min, max });
};

export const getPropertyName = (): string => faker.company.name();

export const getPropertyDescription = (): { [key: string]: string } => ({
  title: faker.lorem.sentence(),
  subtitle: faker.lorem.sentence(),
  text: faker.lorem.paragraphs({ min: 1, max: 4 }),
});

export const feeIntervals: { [key: string]: number[] } = {
  pets: [50, 150],
  parking: [100, 300],
};

export const getFee = (type: 'pets' | 'parking'): number | undefined => {
  let fee: number | undefined;

  if (type === 'pets') {
    fee = faker.number.int({
      min: feeIntervals.pets[0],
      max: feeIntervals.pets[1],
    });
  } else if (type === 'parking') {
    fee = faker.number.int({
      min: feeIntervals.parking[0],
      max: feeIntervals.parking[1],
    });
  }

  if (!fee) {
    return undefined;
  }

  return fee;
};

export const propertyTypeDistribution = [
  19, // Acreage
  2622, // Apartment
  1443, // Basement
  1682, // Condo Unit
  387, // Duplex
  1319, // House
  19, // Loft
  665, // Main Floor
  2, // Mobile
  28, // Office Space
  26, // Parking Spot
  701, // Room for Rent
  36, // Storage
  1047, // Townhouse
  4, // Vacation Home
];

export const propertyTypeCumulative = [
  19, // Acreage
  2641, // Apartment
  4084, // Basement
  5766, // Condo Unit
  6153, // Duplex
  7472, // House
  7491, // Loft
  8156, // Main Floor
  8158, // Mobile
  8186, // Office Space
  8212, // Parking Spot
  8913, // Room for Rent
  8949, // Storage
  9996, // Townhouse
  10000, // Vacation Home
];

export const getPropertyTypeIndex = (): number =>
  propertyTypeCumulative.findIndex(
    (c) => c >= faker.number.int({ min: 1, max: 10000 }),
  );

export const propertyRentIntervals: number[][] = [
  [3000, 5000], // Acreage
  [1400, 3200], // Apartment
  [750, 2300], // Basement
  [1500, 3200], // Condo Unit
  [1300, 3800], // Duplex
  [1200, 4500], // House
  [1700, 3500], // Loft
  [800, 3000], // Main Floor
  [500, 1500], // Mobile
  [700, 3500], // Office Space
  [150, 450], // Parking Spot
  [600, 2000], // Room for Rent
  [150, 700], // Storage
  [1000, 4500], // Townhouse
  [1000, 4500], // Vacation Home
];

export const getPropertyRent = (index: number): number => {
  const [min, max] = propertyRentIntervals[index];
  return Math.round(faker.number.int({ min, max }) / 100) * 100;
};
