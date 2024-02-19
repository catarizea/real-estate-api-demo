import { tasks } from '@/constants';
import { getPropertyForIndex } from '@/controllers';
import { unit } from '@/models/schema';
import { messagePublisher } from '@/services';
import { CommonInsertItemSchema } from '@/types';

import getSingleUnitForIndex from './getSingleUnitForIndex';

const publishInsertUnit: (
  newId: string,
  newValues: CommonInsertItemSchema,
) => Promise<void> = async (newId, newValues) => {
  if (
    process.env.BUN_ENV &&
    ['test', 'postman'].includes(process.env.BUN_ENV)
  ) {
    return;
  }

  const { published, propertyId } = newValues as typeof unit.$inferInsert;

  if (!published) {
    return;
  }

  const propertyForIndex = await getPropertyForIndex(propertyId);

  if (!propertyForIndex) {
    return;
  }

  const unitForIndex = await getSingleUnitForIndex(newId);

  if (!unitForIndex) {
    return;
  }

  messagePublisher({
    type: tasks.unit.create,
    payload: {
      newUnit: {
        ...propertyForIndex,
        ...unitForIndex,
      },
    },
  });
};

export default publishInsertUnit;
