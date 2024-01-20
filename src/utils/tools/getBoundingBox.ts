import getBoundsOfDistance from 'geolib/es/getBoundsOfDistance';

import { Point } from '@/types';

const getBoundingBox = (point: Point, distance: number): Point[] =>
  getBoundsOfDistance(point, distance);

export default getBoundingBox;
