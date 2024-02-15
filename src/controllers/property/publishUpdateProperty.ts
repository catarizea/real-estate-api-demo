import omit from 'lodash.omit';

import { tasks } from '@/constants';
import { preparedPublishedUnit } from '@/models/preparedStatements';
import {
  SelectPropertySchema,
  UpdatePropertySchema,
} from '@/models/zodSchemas';
import { messagePublisher } from '@/services';
import { CommonSelectItemSchemaType, CommonUpdateItemSchema } from '@/types';

import findDifferentFieldValues from './findDifferentFields';
import getPropertyForIndex from './getPropertyForIndex';
import getUnitForIndex from './getUnitForIndex';

const publishUpdateProperty: (
  id: string,
  newValues: CommonUpdateItemSchema & { updatedAt: Date },
  oldValues: CommonSelectItemSchemaType,
) => Promise<void> = async (id, newValues, oldValues) => {
  const { published: newPublished, ...restNew } =
    newValues as UpdatePropertySchema;
  const { published: oldPublished, ...restOld } =
    oldValues as SelectPropertySchema;

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
    const publishedUnit = await preparedPublishedUnit.execute({
      propertyId: id,
    });

    if (publishedUnit.length === 0) {
      return;
    }

    await messagePublisher({
      type: tasks.property.delete,
      payload: {
        unitIds: publishedUnit.map((u) => u.id),
      },
    });

    return;
  }

  if (
    typeof newPublished !== 'undefined' &&
    newPublished === true &&
    oldPublished === false
  ) {
    const propertyForIndex = await getPropertyForIndex(id);

    if (!propertyForIndex) {
      return;
    }

    const unitsForIndex = await getUnitForIndex(id);

    if (!unitsForIndex) {
      return;
    }

    await messagePublisher({
      type: tasks.property.create,
      payload: {
        units: unitsForIndex.map((u) => ({
          ...u,
          ...propertyForIndex,
        })),
      },
    });

    return;
  }

  const differentFieldValues = findDifferentFieldValues(
    omit(restNew, ['updatedAt']),
    omit(restOld, ['updatedAt', 'createdAt']),
  );

  if (!differentFieldValues) {
    return;
  }

  const publishedUnit = await preparedPublishedUnit.execute({ propertyId: id });

  if (publishedUnit.length === 0) {
    return;
  }

  messagePublisher({
    type: tasks.property.update,
    payload: {
      property: differentFieldValues,
      unitIds: publishedUnit.map((u) => u.id),
    },
  });
};

export default publishUpdateProperty;
