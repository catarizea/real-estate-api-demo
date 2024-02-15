import { tasks } from '@/constants';
import { SelectMediaSchema } from '@/models/zodSchemas';
import { CommonSelectItemSchemaType } from '@/types';

import sendPublishParking from './sendPublishParking';

const publishDeleteParking: (
  id: string,
  oldValues: CommonSelectItemSchemaType,
) => Promise<void> = async (_, oldValues) => {
  const { propertyId } = oldValues as SelectMediaSchema;

  sendPublishParking(propertyId, tasks.parking.delete);
};

export default publishDeleteParking;
