import {
  PartialSelectPropertySchema,
  PartialUpdatePropertySchema,
} from '@/types';

const findDifferentFieldValues = (
  newValues: PartialUpdatePropertySchema,
  oldValues: PartialSelectPropertySchema,
): PartialUpdatePropertySchema | null => {
  const differentFieldValues: PartialUpdatePropertySchema = {};

  for (const key in newValues) {
    if (newValues[key] !== oldValues[key]) {
      differentFieldValues[key] = newValues[key];
    }
  }

  return Object.keys(differentFieldValues).length > 0
    ? differentFieldValues
    : null;
};

export default findDifferentFieldValues;
