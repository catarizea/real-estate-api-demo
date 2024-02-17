/* eslint-disable no-console */
import { and, eq } from 'drizzle-orm';
import logSymbols from 'log-symbols';

import { postmanIds } from '@/constants';
import { db } from '@/models';
import {
  bathroom,
  bedroom,
  buildingFeature,
  buildingFeatureToProperty,
  city,
  community,
  communityFeature,
  communityFeatureToCommunity,
  feature,
  featureToProperty,
  floorPlan,
  media,
  mediaType,
  parking,
  property,
  region,
  typeProp,
  unit,
} from '@/models/schema';

try {
  await db.delete(unit).where(eq(unit.id, postmanIds.unit));
  console.log(logSymbols.success, 'unit deleted');
} catch (error) {
  console.error(logSymbols.error, 'unit not deleted', error);
}

try {
  await db.delete(media).where(eq(media.id, postmanIds.media));
  console.log(logSymbols.success, 'media deleted');
} catch (error) {
  console.error(logSymbols.error, 'media not deleted', error);
}

try {
  await db.delete(mediaType).where(eq(mediaType.id, postmanIds.mediaType));
  console.log(logSymbols.success, 'mediaType deleted');
} catch (error) {
  console.error(logSymbols.error, 'mediaType not deleted', error);
}

try {
  await db.delete(floorPlan).where(eq(floorPlan.id, postmanIds.floorPlan));
  console.log(logSymbols.success, 'floorPlan deleted');
} catch (error) {
  console.error(logSymbols.error, 'floorPlan not deleted', error);
}

try {
  await db
    .delete(featureToProperty)
    .where(
      and(
        eq(featureToProperty.featureId, postmanIds.feature),
        eq(featureToProperty.propertyId, postmanIds.property),
      ),
    );
  console.log(logSymbols.success, 'featureToProperty deleted');
} catch (error) {
  console.error(logSymbols.error, 'featureToProperty not deleted', error);
}

try {
  await db.delete(feature).where(eq(feature.id, postmanIds.feature));
  console.log(logSymbols.success, 'feature deleted');
} catch (error) {
  console.error(logSymbols.error, 'feature not deleted', error);
}

try {
  await db
    .delete(buildingFeatureToProperty)
    .where(
      and(
        eq(
          buildingFeatureToProperty.buildingFeatureId,
          postmanIds.buildingFeature,
        ),
        eq(buildingFeatureToProperty.propertyId, postmanIds.property),
      ),
    );
  console.log(logSymbols.success, 'buildingFeatureToProperty deleted');
} catch (error) {
  console.error(
    logSymbols.error,
    'buildingFeatureToProperty not deleted',
    error,
  );
}

try {
  await db
    .delete(buildingFeature)
    .where(eq(buildingFeature.id, postmanIds.buildingFeature));
  console.log(logSymbols.success, 'buildingFeature deleted');
} catch (error) {
  console.error(logSymbols.error, 'buildingFeature not deleted', error);
}

try {
  await db.delete(bedroom).where(eq(bedroom.id, postmanIds.bedroom));
  console.log(logSymbols.success, 'bedroom deleted');
} catch (error) {
  console.error(logSymbols.error, 'bedroom not deleted', error);
}

try {
  await db.delete(bathroom).where(eq(bathroom.id, postmanIds.bathroom));
  console.log(logSymbols.success, 'bathroom deleted');
} catch (error) {
  console.error(logSymbols.error, 'bathroom not deleted', error);
}

try {
  await db.delete(parking).where(eq(parking.id, postmanIds.parking));
  console.log(logSymbols.success, 'parking deleted');
} catch (error) {
  console.error(logSymbols.error, 'parking not deleted', error);
}

try {
  await db.delete(property).where(eq(property.id, postmanIds.property));
  console.log(logSymbols.success, 'property deleted');
} catch (error) {
  console.error(logSymbols.error, 'property not deleted', error);
}

try {
  await db
    .delete(communityFeatureToCommunity)
    .where(
      and(
        eq(
          communityFeatureToCommunity.communityFeatureId,
          postmanIds.communityFeature,
        ),
        eq(communityFeatureToCommunity.communityId, postmanIds.community),
      ),
    );
  console.log(logSymbols.success, 'communityFeatureToCommunity deleted');
} catch (error) {
  console.error(
    logSymbols.error,
    'communityFeatureToCommunity not deleted',
    error,
  );
}

try {
  await db
    .delete(communityFeature)
    .where(eq(communityFeature.id, postmanIds.communityFeature));
  console.log(logSymbols.success, 'communityFeature deleted');
} catch (error) {
  console.error(logSymbols.error, 'communityFeature not deleted', error);
}

try {
  await db.delete(community).where(eq(community.id, postmanIds.community));
  console.log(logSymbols.success, 'community deleted');
} catch (error) {
  console.error(logSymbols.error, 'community not deleted', error);
}

try {
  await db.delete(city).where(eq(city.id, postmanIds.city));
  console.log(logSymbols.success, 'city deleted');
} catch (error) {
  console.error(logSymbols.error, 'city not deleted', error);
}

try {
  await db.delete(region).where(eq(region.id, postmanIds.region));
  console.log(logSymbols.success, 'region deleted');
} catch (error) {
  console.error(logSymbols.error, 'region not deleted', error);
}

try {
  await db.delete(typeProp).where(eq(typeProp.id, postmanIds.typeProp));
  console.log(logSymbols.success, 'typeProp deleted');
} catch (error) {
  console.error(logSymbols.error, 'typeProp not deleted', error);
}

process.exit(0);
