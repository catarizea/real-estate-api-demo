import getBoundsOfDistance from 'geolib/es/getBoundsOfDistance';
import type { GeolibInputCoordinates } from 'geolib/es/types';

const getBoundingBox = (
  point: GeolibInputCoordinates,
  distance: number,
): GeolibInputCoordinates[] => getBoundsOfDistance(point, distance);

export default getBoundingBox;
