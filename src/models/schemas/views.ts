import {
  date,
  decimal,
  int,
  mysqlView,
  text,
  tinyint,
} from 'drizzle-orm/mysql-core';

export const propertyView = mysqlView('property_view', {
  id: text('id'),
  listingId: int('listing_id'),
  address: text('address'),
  community: text('community'),
  type: text('type'),
  smoking: tinyint('smoking'),
  cats: tinyint('cats'),
  dogs: tinyint('dogs'),
  latitude: decimal('latitude'),
  longitude: decimal('longitude'),
  parking: text('parking'),
  feature: text('feature'),
  imageId: text('image_id'),
}).existing();

export const unitView = mysqlView('unit_view', {
  id: text('id'),
  propertyId: text('property_id'),
  rent: int('rent'),
  immediate: tinyint('immediate'),
  availableDate: date('available_date'),
  shortterm: tinyint('shortterm'),
  longterm: tinyint('longterm'),
  furnished: tinyint('furnished'),
  heat: tinyint('heat'),
  water: tinyint('water'),
  electricity: tinyint('electricity'),
  internet: tinyint('internet'),
  television: tinyint('television'),
  bedroom: text('bedroom'),
  bathroom: text('bathroom'),
}).existing();

const similarColumns = {
  id: text('id'),
  propertyId: text('property_id'),
  rent: int('rent'),
  immediate: tinyint('immediate'),
  availableDate: date('available_date'),
  shortterm: tinyint('shortterm'),
  longterm: tinyint('longterm'),
  furnished: tinyint('furnished'),
  heat: tinyint('heat'),
  water: tinyint('water'),
  electricity: tinyint('electricity'),
  internet: tinyint('internet'),
  television: tinyint('television'),
  bedroom: text('bedroom'),
  bathroom: text('bathroom'),
  listingId: int('listing_id'),
  address: text('address'),
  community: text('community'),
  type: text('type'),
  smoking: tinyint('smoking'),
  cats: tinyint('cats'),
  dogs: tinyint('dogs'),
  latitude: decimal('latitude'),
  longitude: decimal('longitude'),
  parking: text('parking'),
  feature: text('feature'),
  imageId: text('image_id'),
};

export const allView = mysqlView('all_view', similarColumns).existing();

export const searchView = mysqlView('search_view', similarColumns).existing();
