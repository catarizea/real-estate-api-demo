import { PartialSelectUnitSchema, PartialUpdateUnitSchema } from '@/types';

const findDifferentUnitFieldValues = (
  newValues: PartialUpdateUnitSchema,
  oldValues: PartialSelectUnitSchema,
): PartialUpdateUnitSchema | null => {
  const differentFieldValues: PartialUpdateUnitSchema = {};

  for (const key in newValues) {
    if (newValues[key] !== oldValues[key]) {
      differentFieldValues[key] = newValues[key];
    }
  }

  return Object.keys(differentFieldValues).length > 0
    ? differentFieldValues
    : null;
};

export default findDifferentUnitFieldValues;
