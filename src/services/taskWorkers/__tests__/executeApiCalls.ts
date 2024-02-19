/* eslint-disable no-console */

import axios from 'axios';
import { sleep } from 'bun';
import logSymbols from 'log-symbols';

import { postmanIds } from '@/constants';
import {
  insertBathroomSchemaExample,
  insertCitySchemaExample,
  insertCommunitySchemaExample,
  insertFeatureSchemaExample,
  insertFloorPlanSchemaExample,
  insertMediaSchemaExample,
  insertMediaTypeSchemaExample,
  insertParkingSchemaExample,
  insertPropertySchemaExample,
  insertRegionSchemaExample,
  insertTypePropSchemaExample,
  insertUnitSchemaExample,
  updateParkingSchemaExample,
  updatePropertySchemaExample,
  updateUnitSchemaExample,
} from '@/models/zodSchemas';

const sleepTime = 300;

const executeApiCalls = async () => {
  const start = performance.now();

  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.headers['Content-Type'] = 'application/json';

  try {
    await axios.post(`/region/create`, insertRegionSchemaExample);
    console.log(logSymbols.success, 'Region created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating region');
  }

  await sleep(sleepTime);

  try {
    await axios.post(`/city/create`, insertCitySchemaExample);
    console.log(logSymbols.success, 'City created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating city');
  }

  await sleep(sleepTime);

  try {
    await axios.post(`/community/create`, insertCommunitySchemaExample);
    console.log(logSymbols.success, 'Community created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating community');
  }

  await sleep(sleepTime);

  try {
    await axios.post(`/bathroom/create`, insertBathroomSchemaExample);
    console.log(logSymbols.success, 'Bathroom created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating bathroom');
  }

  await sleep(sleepTime);

  try {
    await axios.post(`/bedroom/create`, insertBathroomSchemaExample);
    console.log(logSymbols.success, 'Bedroom created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating bedroom');
  }

  await sleep(sleepTime);

  try {
    await axios.post(`/feature/create`, insertFeatureSchemaExample);
    console.log(logSymbols.success, 'Feature created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating feature');
  }

  await sleep(sleepTime);

  try {
    await axios.post(`/media-type/create`, insertMediaTypeSchemaExample);
    console.log(logSymbols.success, 'Media type created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating media type');
  }

  await sleep(sleepTime);

  try {
    await axios.post(`/type-prop/create`, insertTypePropSchemaExample);
    console.log(logSymbols.success, 'Type prop created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating type prop');
  }

  await sleep(sleepTime);

  try {
    await axios.post(`/property/create`, insertPropertySchemaExample);
    console.log(logSymbols.success, 'Property created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating property');
  }

  await sleep(sleepTime);

  try {
    await axios.post(`/feature-to-property/create`, {
      featureId: postmanIds.feature,
      itemId: postmanIds.property,
    });
    console.log(logSymbols.success, 'Feature to property created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating feature to property');
  }

  await sleep(sleepTime);

  try {
    await axios.post(`/media/create`, insertMediaSchemaExample);
    console.log(logSymbols.success, 'Media created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating media');
  }

  await sleep(sleepTime);

  try {
    await axios.post(`/parking/create`, insertParkingSchemaExample);
    console.log(logSymbols.success, 'Parking created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating parking');
  }

  await sleep(sleepTime);

  try {
    await axios.post(`/floor-plan/create`, insertFloorPlanSchemaExample);
    console.log(logSymbols.success, 'Floor plan created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating floor plan');
  }

  await sleep(sleepTime);

  try {
    await axios.post(`/unit/create`, insertUnitSchemaExample);
    console.log(logSymbols.success, 'Unit created');
  } catch (error) {
    console.error(logSymbols.error, 'Error creating unit');
  }

  await sleep(sleepTime);

  /*
UPDATE
======
*/

  try {
    await axios.put(`/property/update/${postmanIds.property}`, {
      ...updatePropertySchemaExample,
      published: true,
    });
    console.log(logSymbols.success, 'Property updated');
  } catch (error) {
    console.error(logSymbols.error, 'Error updating property');
  }

  await sleep(sleepTime);

  try {
    await axios.put(`/unit/update/${postmanIds.unit}`, {
      ...updateUnitSchemaExample,
      published: true,
    });
  } catch (error) {
    console.error(logSymbols.error, 'Error updating unit');
  }

  await sleep(sleepTime);

  try {
    await axios.put(`/property/update/${postmanIds.property}`, {
      published: false,
    });
    console.log(logSymbols.success, 'Property updated');
  } catch (error) {
    console.error(logSymbols.error, 'Error updating property');
  }

  await sleep(sleepTime);

  try {
    await axios.put(`/property/update/${postmanIds.property}`, {
      published: true,
    });
    console.log(logSymbols.success, 'Property updated');
  } catch (error) {
    console.error(logSymbols.error, 'Error updating property');
  }

  await sleep(sleepTime);

  try {
    await axios.put(
      `/parking/update/${postmanIds.parking}`,
      updateParkingSchemaExample,
    );
    console.log(logSymbols.success, 'Parking updated');
  } catch (error) {
    console.error(logSymbols.error, 'Error updating parking');
  }

  await sleep(sleepTime);

  try {
    await axios.put(`/unit/update/${postmanIds.unit}`, { published: false });
  } catch (error) {
    console.error(logSymbols.error, 'Error updating unit');
  }

  await sleep(sleepTime);

  try {
    await axios.put(`/unit/update/${postmanIds.unit}`, { published: true });
  } catch (error) {
    console.error(logSymbols.error, 'Error updating unit');
  }

  await sleep(sleepTime);

  try {
    await axios.delete(
      `/feature-to-property/delete/${postmanIds.feature}/${postmanIds.property}`,
    );
    console.log(logSymbols.success, 'Feature to property updated');
  } catch (error) {
    console.error(logSymbols.error, 'Error updating feature to property');
  }

  await sleep(sleepTime);

  try {
    await axios.put(`/media/update/${postmanIds.media}`, {
      assetId: '3fjjah9',
    });
    console.log(logSymbols.success, 'Media updated');
  } catch (error) {
    console.error(logSymbols.error, 'Error updating media');
  }

  await sleep(sleepTime);

  try {
    await axios.put(
      `/parking/update/${postmanIds.parking}`,
      updateParkingSchemaExample,
    );
    console.log(logSymbols.success, 'Parking updated');
  } catch (error) {
    console.error(logSymbols.error, 'Error updating parking');
  }

  await sleep(sleepTime);

  /*
DELETE
======
*/

  try {
    await axios.delete(`/unit/delete/${postmanIds.unit}`);
    console.log(logSymbols.success, 'Unit deleted');
  } catch (error) {
    console.error(logSymbols.error, 'Error deleting unit');
  }

  await sleep(sleepTime);

  try {
    await axios.delete(`/floor-plan/delete/${postmanIds.floorPlan}`);
    console.log(logSymbols.success, 'Floor plan deleted');
  } catch (error) {
    console.error(logSymbols.error, 'Error deleting floor plan');
  }

  await sleep(sleepTime);

  try {
    await axios.delete(`/parking/delete/${postmanIds.parking}`);
    console.log(logSymbols.success, 'Parking deleted');
  } catch (error) {
    console.error(logSymbols.error, 'Error deleting parking');
  }

  await sleep(sleepTime);

  try {
    await axios.delete(`/media/delete/${postmanIds.media}`);
    console.log(logSymbols.success, 'Media deleted');
  } catch (error) {
    console.error(logSymbols.error, 'Error deleting media');
  }

  await sleep(sleepTime);

  try {
    await axios.delete(`/property/delete/${postmanIds.property}`);
    console.log(logSymbols.success, 'Property deleted');
  } catch (error) {
    console.error(logSymbols.error, 'Error deleting property');
  }

  await sleep(sleepTime);

  try {
    await axios.delete(`/type-prop/delete/${postmanIds.typeProp}`);
    console.log(logSymbols.success, 'Type prop deleted');
  } catch (error) {
    console.error(logSymbols.error, 'Error deleting type prop');
  }

  await sleep(sleepTime);

  try {
    await axios.delete(`/media-type/delete/${postmanIds.mediaType}`);
    console.log(logSymbols.success, 'Media type deleted');
  } catch (error) {
    console.error(logSymbols.error, 'Error deleting media type');
  }

  await sleep(sleepTime);

  try {
    await axios.delete(`/feature/delete/${postmanIds.feature}`);
    console.log(logSymbols.success, 'Feature deleted');
  } catch (error) {
    console.error(logSymbols.error, 'Error deleting feature');
  }

  await sleep(sleepTime);

  try {
    await axios.delete(`/bedroom/delete/${postmanIds.bedroom}`);
    console.log(logSymbols.success, 'Bedroom deleted');
  } catch (error) {
    console.error(logSymbols.error, 'Error deleting bedroom');
  }

  await sleep(sleepTime);

  try {
    await axios.delete(`/bathroom/delete/${postmanIds.bathroom}`);
    console.log(logSymbols.success, 'Bathroom deleted');
  } catch (error) {
    console.error(logSymbols.error, 'Error deleting bathroom');
  }

  await sleep(sleepTime);

  try {
    await axios.delete(`/community/delete/${postmanIds.community}`);
    console.log(logSymbols.success, 'Community deleted');
  } catch (error) {
    console.error(logSymbols.error, 'Error deleting community');
  }

  await sleep(sleepTime);

  try {
    await axios.delete(`/city/delete/${postmanIds.city}`);
    console.log(logSymbols.success, 'City deleted');
  } catch (error) {
    console.error(logSymbols.error, 'Error deleting city');
  }

  await sleep(sleepTime);

  try {
    await axios.delete(`/region/delete/${postmanIds.region}`);
    console.log(logSymbols.success, 'Region deleted');
  } catch (error) {
    console.error(logSymbols.error, 'Error deleting region');
  }

  await sleep(sleepTime);

  const duration = performance.now() - start;

  console.log(logSymbols.info, 'All done');

  console.log(`Execution time: ${Math.round(duration / 1000)} s`);
};

// await executeApiCalls();

export default executeApiCalls;
