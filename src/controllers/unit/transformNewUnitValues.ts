import { PartialUpdateUnitSchema, UnitUpdateIndexFragment } from '@/types';

const transformNewUnitValues = (
  id: string,
  u: PartialUpdateUnitSchema,
): UnitUpdateIndexFragment => {
  const unitForIndex: UnitUpdateIndexFragment = { objectID: id };

  if (u.rent) {
    unitForIndex.rent = u.rent;
  }

  if (typeof u.immediate !== 'undefined') {
    unitForIndex.immediate = u.immediate ? 1 : 0;
  }

  if (typeof u.shortterm !== 'undefined') {
    unitForIndex.shortterm = u.shortterm ? 1 : 0;
  }

  if (typeof u.longterm !== 'undefined') {
    unitForIndex.longterm = u.longterm ? 1 : 0;
  }

  if (typeof u.furnished !== 'undefined') {
    unitForIndex.furnished = u.furnished ? 1 : 0;
  }

  if (typeof u.heat !== 'undefined') {
    unitForIndex.heat = u.heat ? 1 : 0;
  }

  if (typeof u.water !== 'undefined') {
    unitForIndex.water = u.water ? 1 : 0;
  }

  if (typeof u.electricity !== 'undefined') {
    unitForIndex.electricity = u.electricity ? 1 : 0;
  }

  if (typeof u.internet !== 'undefined') {
    unitForIndex.internet = u.internet ? 1 : 0;
  }

  if (typeof u.television !== 'undefined') {
    unitForIndex.television = u.television ? 1 : 0;
  }

  if (u.availableDate) {
    unitForIndex.availableDate = new Date(u.availableDate);
  }

  if (u.bedroom) {
    unitForIndex.bedroom = u.bedroom.name;
  }

  if (u.bathroom) {
    unitForIndex.bathroom = u.bathroom.name;
  }

  return unitForIndex;
};

export default transformNewUnitValues;
