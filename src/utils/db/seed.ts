import { faker } from '@faker-js/faker';

import { db } from '@/models';
import { property } from '@/models/schema';

faker.seed(12);

const properties = [...Array(50).keys()].map((index) => {
  if (index === 0) {
    return {
      name: faker.company.name(),
      address: faker.location.streetAddress(),
      createdAt: new Date('2021-01-01'),
    };
  }

  return {
    name: faker.company.name(),
    address: faker.location.streetAddress(),
  };
});

await db.insert(property).values(properties);
