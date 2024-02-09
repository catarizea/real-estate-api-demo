import { db } from '@/models';
import { InsertParkingSchema } from '@/models/zodSchemas';
import { badRequestResponse } from '@/utils';
import * as taxonomy from '@/utils/db/taxonomy';

const customInsertParkingCheck = async (body: InsertParkingSchema) => {
  if (!taxonomy.parking.includes(body.name)) {
    return JSON.stringify(
      badRequestResponse({
        reason: 'validation error',
        message: `name must be one of ${taxonomy.parking.join(', ')}`,
        path: ['name'],
      }),
    );
  }

  const propertyExists = await db.query.property.findFirst({
    where: (property, { eq }) => eq(property.id, body.propertyId),
  });

  if (!propertyExists) {
    return JSON.stringify(
      badRequestResponse({
        reason: 'validation error',
        message: `property with id ${body.propertyId} does not exist`,
        path: ['propertyId'],
      }),
    );
  }

  const parkingExists = await db.query.parking.findFirst({
    where: (parking, { and, eq }) =>
      and(eq(parking.propertyId, body.propertyId), eq(parking.name, body.name)),
  });

  if (parkingExists) {
    return JSON.stringify(
      badRequestResponse({
        reason: 'validation error',
        message: `parking with name ${body.name} already exists for property with id ${body.propertyId}`,
        path: ['name'],
      }),
    );
  }

  return null;
};

export default customInsertParkingCheck;
