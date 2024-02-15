import { preparedUnitForIndex } from '@/models/preparedStatements';
import { UnitIndexFragment } from '@/types';
import { PreparedUnitForIndexSchema } from '@/validators';

const getUnitForIndex = async (
  id: string,
): Promise<UnitIndexFragment[] | null> => {
  const units = await preparedUnitForIndex.execute({ propertyId: id });

  if (!units || units.length === 0) {
    return null;
  }

  const us = units as PreparedUnitForIndexSchema[];

  const unitsForIndex = us.map((u) => {
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
  });

  return unitsForIndex;
};

export default getUnitForIndex;
