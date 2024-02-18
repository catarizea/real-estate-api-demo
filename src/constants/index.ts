import { Point } from '@/types';

export const defaultPerPage = 10;

export const maxPerPage = 100;

export const dbSeedPrefix = '[DB SEED]';

export const algoliaSeedPrefix = '[ALGOLIA SEED]';

export const rabbitMqPrefix = '[RABBITMQ]';

export const taskPrefix = '[TASK]';

export const rabbitMqQueue = 'real-estate-api-demo-tasks';

export const tasks = {
  feature: {
    update: 'feature.update',
  },
  media: {
    create: 'media.create',
    update: 'media.update',
    delete: 'media.delete',
  },
  parking: {
    create: 'parking.create',
    update: 'parking.update',
    delete: 'parking.delete',
  },
  property: {
    create: 'property.create',
    update: 'property.update',
    delete: 'property.delete',
  },
  unit: {
    create: 'unit.create',
    update: 'unit.update',
    delete: 'unit.delete',
  },
};

export const testPoint: Point = {
  latitude: 50.9573828,
  longitude: -114.084153,
};

export const postmanIds = {
  bathroom: 'qae4cp7xnotk3wh26dkpp7y7',
  bedroom: 'zjggk1ve17r7jmpq8dtmbjyw',
  buildingFeature: 'zsm6fam0k05blkaeoit8x09a',
  city: 'dl7r7ezrt909p6bmct6avl9l',
  community: 'icj3bimn4dg5v1yeu7i2frzq',
  communityFeature: 'cwswfax9454xpaxcym2la262',
  feature: 'i53gzgu35snbfwuc94hsivb3',
  floorPlan: 'fe897wto8ribvu9024zvfvxp',
  media: 'h8e874h63772amg892ajzbo6',
  mediaType: 'kaeu5o03h4ihq1zoxzb19l92',
  parking: 'wowhdybituf34cr8im31nr4s',
  property: 'hdsyi7gw3n77jrngcck1x33y',
  region: 'kj3nrb5rv094v8ns5ptz1jhc',
  typeProp: 'zvyuykclatrceuwmxo1bd42p',
  unit: 'amyphpzv9inobdo3x1dfu18p',
};
