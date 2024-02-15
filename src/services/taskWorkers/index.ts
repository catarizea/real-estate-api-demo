import { Channel, Message } from 'amqplib';

import { taskPrefix, tasks } from '@/constants';
import { logger } from '@/services';
import { RabbitMqMessage } from '@/types';

import { mediaWorker } from './media';
import { parkingWorker } from './parking';

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
      logger.info(`${taskPrefix} processing task ${tasks.property.create}`);
      channel.ack(message);
      break;
    case tasks.property.update:
      logger.info(`${taskPrefix} processing task ${tasks.property.update}`);
      channel.ack(message);
      break;
    case tasks.property.delete:
      logger.info(`${taskPrefix} processing task ${tasks.property.delete}`);
      channel.ack(message);
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
    default:
      logger.error(`${taskPrefix} unknown task type ${rabbitMqMessage.type}`);
      break;
  }
};

export default worker;
