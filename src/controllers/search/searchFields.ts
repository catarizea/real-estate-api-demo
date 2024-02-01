import pick from 'lodash.pick';

import { searchView } from '@/models/schema';
import { FieldsSchema } from '@/validators';

export const all = {
  id: searchView.id,
  propertyId: searchView.propertyId,
  rent: searchView.rent,
  immediate: searchView.immediate,
  availableDate: searchView.availableDate,
  shortterm: searchView.shortterm,
  longterm: searchView.longterm,
  furnished: searchView.furnished,
  heat: searchView.heat,
  water: searchView.water,
  electricity: searchView.electricity,
  internet: searchView.internet,
  television: searchView.television,
  bedroom: searchView.bedroom,
  bathroom: searchView.bathroom,
  listingId: searchView.listingId,
  address: searchView.address,
  community: searchView.community,
  type: searchView.type,
  smoking: searchView.smoking,
  cats: searchView.cats,
  dogs: searchView.dogs,
  latitude: searchView.latitude,
  longitude: searchView.longitude,
  parking: searchView.parking,
  feature: searchView.feature,
  imageId: searchView.imageId,
};

export const selectFields = (fields: FieldsSchema) =>
  pick(all, ['id', ...fields]);
