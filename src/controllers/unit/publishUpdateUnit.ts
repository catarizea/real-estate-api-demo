import omit from 'lodash.omit';

import { tasks } from '@/constants';
import { getPropertyForIndex } from '@/controllers';
import { db } from '@/models';
import { SelectUnitSchema, UpdateUnitSchema } from '@/models/zodSchemas';
import { messagePublisher } from '@/services';
import { CommonSelectItemSchemaType, CommonUpdateItemSchema } from '@/types';

import findDifferentUnitFields from './findDifferentUnitFields';
import getSingleUnitForIndex from './getSingleUnitForIndex';
import transformNewUnitValues from './transformNewUnitValues';

const publishUpdateUnit: (
  id: string,
  newValues: CommonUpdateItemSchema & { updatedAt: Date },
  oldValues: CommonSelectItemSchemaType,
) => Promise<void> = async (id, newValues, oldValues) => {
  if (
    process.env.BUN_ENV &&
    ['test', 'postman'].includes(process.env.BUN_ENV)
  ) {
    return;
  }

  const { published: newPublished, ...restNew } = newValues as UpdateUnitSchema;
  const { published: oldPublished, ...restOld } = oldValues as SelectUnitSchema;

  if (
    (typeof newPublished !== 'undefined' &&
      newPublished === false &&
      oldPublished === false) ||
    (typeof newPublished === 'undefined' && oldPublished === false)
  ) {
    return;
  }

  if (
    typeof newPublished !== 'undefined' &&
    newPublished === false &&
    oldPublished === true
  ) {
    const publishedProperty = await db.query.property.findFirst({
      columns: { id: true },
      where: (property, { eq, and }) =>
        and(eq(property.id, restOld.propertyId), eq(property.published, true)),
    });

    if (!publishedProperty) {
      return;
    }

    await messagePublisher({
      type: tasks.unit.delete,
      payload: { id },
    });

    return;
  }

  if (
    typeof newPublished !== 'undefined' &&
    newPublished === true &&
    oldPublished === false
  ) {
    const propertyForIndex = await getPropertyForIndex(restOld.propertyId);

    if (!propertyForIndex) {
      return;
    }

    const unitForIndex = await getSingleUnitForIndex(id);

    if (!unitForIndex) {
      return;
    }

    await messagePublisher({
      type: tasks.unit.create,
      payload: {
        newUnit: {
          ...propertyForIndex,
          ...unitForIndex,
        },
      },
    });

    return;
  }

  const differentFields = findDifferentUnitFields(
    omit(restNew, ['updatedAt']),
    omit(restOld, ['updatedAt', 'createdAt']),
  );

  if (!differentFields) {
    return;
  }

  messagePublisher({
    type: tasks.unit.update,
    payload: {
      unit: transformNewUnitValues(id, differentFields),
    },
  });
};

export default publishUpdateUnit;
