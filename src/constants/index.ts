import { Point } from '@/types';

export const defaultPerPage = 10;

export const maxPerPage = 100;

export const dbSeedPrefix = '[DB SEED]';

export const algoliaSeedPrefix = '[ALGOLIA SEED]';

export const rabbitMqPrefix = '[RABBITMQ]';

export const taskPrefix = '[TASK]';

export const rabbitMqQueue = 'real-estate-api-demo-tasks';

export const tasks = {
  property: {
    insert: 'property.insert',
    update: 'property.update',
  },
  buildingFeature: {
    insert: 'buildingFeature.insert',
    update: 'buildingFeature.update',
  },
  feature: {
    insert: 'feature.insert',
    update: 'feature.update',
  },
  media: {
    create: 'media.create',
    update: 'media.update',
    delete: 'media.delete',
  },
};

export const testPoint: Point = {
  latitude: 50.9573828,
  longitude: -114.084153,
};
