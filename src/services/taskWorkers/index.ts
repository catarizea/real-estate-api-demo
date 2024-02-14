import { Channel, Message } from 'amqplib/callback_api';

import { taskPrefix, tasks } from '@/constants';
import { logger } from '@/services';
import { RabbitMqMessage } from '@/types';

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
    case tasks.media.insert:
      logger.info(`${taskPrefix} processing task ${tasks.media.insert}`);
      channel.ack(message);
      break;
    default:
      logger.error(`${taskPrefix} unknown task type ${rabbitMqMessage.type}`);
      break;
  }
};

export default worker;
