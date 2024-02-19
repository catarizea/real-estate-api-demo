import { tasks } from '@/constants';
import { db } from '@/models';
import { SelectUnitSchema } from '@/models/zodSchemas';
import { messagePublisher } from '@/services';
import { CommonSelectItemSchemaType } from '@/types';

const publishDeleteUnit: (
  id: string,
  oldValues: CommonSelectItemSchemaType,
) => Promise<void> = async (id, oldValues) => {
  if (
    process.env.BUN_ENV &&
    ['test', 'postman'].includes(process.env.BUN_ENV)
  ) {
    return;
  }

  const { propertyId } = oldValues as SelectUnitSchema;

  const publishedProperty = await db.query.property.findFirst({
    columns: { id: true },
    where: (property, { eq, and }) =>
      and(eq(property.id, propertyId), eq(property.published, true)),
  });

  if (!publishedProperty) {
    return;
  }

  messagePublisher({
    type: tasks.unit.delete,
    payload: { id },
  });
};

export default publishDeleteUnit;
