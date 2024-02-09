import { UpdateParkingSchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';
import * as taxonomy from '@/utils/db/taxonomy';

const customUpdateParkingCheck = async (body: UpdateParkingSchema) => {
  if (body.name && !taxonomy.parking.includes(body.name)) {
    return JSON.stringify(
      badRequestResponse({
        reason: 'validation error',
        message: `name must be one of ${taxonomy.parking.join(', ')}`,
        path: ['name'],
      }),
    );
  }

  return null;
};

export default customUpdateParkingCheck;
