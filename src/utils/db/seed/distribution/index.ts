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

export const getFloorPlan = (percent: number) => {
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

export const propertySurfaceIntervals: { [key: string]: number[] } = {
  Acreage: [1500, 3500],
  Apartment: [600, 1000],
  Basement: [500, 1000],
  'Condo Unit': [600, 1000],
  Duplex: [900, 1800],
  House: [900, 2500],
  Loft: [500, 1700],
  'Main Floor': [900, 2300],
  Mobile: [150, 300],
  'Office Space': [1500, 3500],
  'Parking Spot': [270, 1000],
  'Room for Rent': [150, 800],
  Storage: [270, 1000],
  Townhouse: [900, 1600],
  'Vacation Home': [900, 1600],
};

export const getPropertySurface = (type: string): number => {
  const [min, max] = propertySurfaceIntervals[type];
  return faker.number.int({ min, max });
};

export const getPropertyName = (): string => faker.company.name();

export const getPropertyDescription = (): { [key: string]: string } => ({
  title: faker.lorem.sentence(),
  subtitle: faker.lorem.sentence(),
  text: faker.lorem.paragraphs({ min: 1, max: 4 }),
});

export const getPetsFee = (): number => faker.number.int({ min: 50, max: 150 });
