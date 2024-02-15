import { tasks } from '@/constants';
import { SelectMediaSchema } from '@/models/zodSchemas';
import { CommonSelectItemSchemaType, CommonUpdateItemSchema } from '@/types';

import sendPublishParking from './sendPublishParking';

const publishUpdateParking: (
  newId: string,
  newValues: CommonUpdateItemSchema & { updatedAt: Date },
  oldValues: CommonSelectItemSchemaType,
) => Promise<void> = async (_, __, oldValues) => {
  const { propertyId } = oldValues as SelectMediaSchema;

  sendPublishParking(propertyId, tasks.parking.update);
};

export default publishUpdateParking;
