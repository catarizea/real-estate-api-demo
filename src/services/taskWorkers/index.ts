import { Channel, Message } from 'amqplib';

import { taskPrefix, tasks } from '@/constants';
import { logger } from '@/services';
import { RabbitMqMessage } from '@/types';

import { mediaInsertWorker } from './media';

const worker = (
  rabbitMqMessage: RabbitMqMessage,
  channel: Channel,
  message: Message,
) => {
  switch (rabbitMqMessage.type) {
    case tasks.property.insert:
      logger.info(`${taskPrefix} processing task ${tasks.property.insert}`);
      channel.ack(message);
      break;
    case tasks.property.update:
      logger.info(`${taskPrefix} processing task ${tasks.property.update}`);
      channel.ack(message);
      break;
    case tasks.media.update:
      mediaInsertWorker(rabbitMqMessage, channel, message, tasks.media.update);
      break;
    case tasks.media.insert:
      mediaInsertWorker(rabbitMqMessage, channel, message, tasks.media.insert);
      break;
    default:
      logger.error(`${taskPrefix} unknown task type ${rabbitMqMessage.type}`);
      break;
  }
};

export default worker;
