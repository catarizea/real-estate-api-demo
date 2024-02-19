import { preparedSingleUnitForIndex } from '@/models/preparedStatements';
import { UnitIndexFragment } from '@/types';
import { PreparedUnitForIndexSchema } from '@/validators';

const getSingleUnitForIndex = async (
  id: string,
): Promise<UnitIndexFragment | null> => {
  const unit = await preparedSingleUnitForIndex.execute({ id });

  if (!unit) {
    return null;
  }

  const u = unit as PreparedUnitForIndexSchema;

  const unitForIndex: UnitIndexFragment = {
    objectID: u.id,
    propertyId: id,
    rent: u.rent,
    immediate: u.immediate ? 1 : 0,
    shortterm: u.shortterm ? 1 : 0,
    longterm: u.longterm ? 1 : 0,
    furnished: u.furnished ? 1 : 0,
    heat: u.heat ? 1 : 0,
    water: u.water ? 1 : 0,
    electricity: u.electricity ? 1 : 0,
    internet: u.internet ? 1 : 0,
    television: u.television ? 1 : 0,
  };

  if (u.availableDate) {
    unitForIndex.availableDate = u.availableDate;
  }

  if (u.bedroom) {
    unitForIndex.bedroom = u.bedroom.name;
  }

  if (u.bathroom) {
    unitForIndex.bathroom = u.bathroom.name;
  }

  return unitForIndex;
};

export default getSingleUnitForIndex;
