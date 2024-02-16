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
    create: 'feature.create',
    update: 'feature.update',
    delete: 'feature.delete',
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
