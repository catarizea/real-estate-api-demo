import { tasks } from '@/constants';
import { parking } from '@/models/schema';
import { CommonInsertItemSchema } from '@/types';

import sendPublishParking from './sendPublishParking';

const publishInsertParking: (
  newId: string,
  newValues: CommonInsertItemSchema,
) => Promise<void> = async (_, newValues) => {
  const { propertyId } = newValues as typeof parking.$inferInsert;

  sendPublishParking(propertyId, tasks.parking.create);
};

export default publishInsertParking;
