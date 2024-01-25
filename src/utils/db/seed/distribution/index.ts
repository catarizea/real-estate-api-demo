import { faker } from '@faker-js/faker';

export const floorPlans = [
  [{ units: 1 }],
  [{ units: 2 }],
  [{ units: 3 }],
  [{ units: 2 }, { units: 3 }],
  [{ units: 4 }, { units: 2 }, { units: 1 }],
  [{ units: 2 }, { units: 1 }, { units: 6 }],
  [{ units: 1 }, { units: 4 }, { units: 3 }, { units: 2 }],
  [{ units: 2 }, { units: 3 }, { units: 4 }, { units: 1 }],
  [{ units: 1 }, { units: 5 }, { units: 2 }, { units: 1 }, { units: 8 }],
  [{ units: 6 }, { units: 3 }, { units: 5 }, { units: 10 }, { units: 3 }],
];

export const distribution = [35, 15, 10, 9, 7, 6, 6, 6, 4, 2];

export const cumulative = [35, 50, 60, 69, 76, 82, 88, 94, 98, 100];

export const getRandomFeatures = (
  taxonomyIds: string[],
  maxFeatures: number,
) => {
  const limit = faker.number.int({ min: 1, max: maxFeatures });

  const indexes = [...Array(limit).keys()].map(() =>
    faker.number.int({ min: 0, max: taxonomyIds.length - 1 }),
  );

  return indexes.map((i) => taxonomyIds[i]);
};
