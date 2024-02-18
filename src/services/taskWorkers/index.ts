import { Channel, Message } from 'amqplib';

import { taskPrefix, tasks } from '@/constants';
import { logger } from '@/services';
import { RabbitMqMessage } from '@/types';

import { featureWorker } from './feature';
import { mediaWorker } from './media';
import { parkingWorker } from './parking';
import {
  propertyCreateWorker,
  propertyDeleteWorker,
  propertyUpdateWorker,
} from './property';

const worker = (
  rabbitMqMessage: RabbitMqMessage,
  channel: Channel,
  message: Message,
) => {
  if (!rabbitMqMessage) {
    logger.error(`${taskPrefix} undefined message cannot process task`);
    return;
  }

  if (!rabbitMqMessage.type || !rabbitMqMessage.payload) {
    logger.error(`${taskPrefix} invalid message cannot process task`);
    return;
  }

  switch (rabbitMqMessage.type) {
    case tasks.property.create:
      propertyCreateWorker(
        rabbitMqMessage,
        channel,
        message,
        tasks.property.create,
      );
      break;
    case tasks.property.update:
      propertyUpdateWorker(
        rabbitMqMessage,
        channel,
        message,
        tasks.property.update,
      );
      break;
    case tasks.property.delete:
      propertyDeleteWorker(
        rabbitMqMessage,
        channel,
        message,
        tasks.property.delete,
      );
      break;
    case tasks.media.create:
      mediaWorker(rabbitMqMessage, channel, message, tasks.media.create);
      break;
    case tasks.media.update:
      mediaWorker(rabbitMqMessage, channel, message, tasks.media.update);
      break;
    case tasks.media.delete:
      mediaWorker(rabbitMqMessage, channel, message, tasks.media.delete);
      break;
    case tasks.parking.create:
      parkingWorker(rabbitMqMessage, channel, message, tasks.parking.create);
      break;
    case tasks.parking.update:
      parkingWorker(rabbitMqMessage, channel, message, tasks.parking.update);
      break;
    case tasks.parking.delete:
      parkingWorker(rabbitMqMessage, channel, message, tasks.parking.delete);
      break;
    case tasks.feature.update:
      featureWorker(rabbitMqMessage, channel, message, tasks.feature.update);
      break;
    default:
      logger.error(`${taskPrefix} unknown task type ${rabbitMqMessage.type}`);
      break;
  }
};

export default worker;
