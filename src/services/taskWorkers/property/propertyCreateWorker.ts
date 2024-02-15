import { Channel, Message } from 'amqplib';

import { taskPrefix } from '@/constants';
import { index } from '@/providers/algolia';
import { logger } from '@/services';
import { RabbitMqMessage, UnitsPayload } from '@/types';

const propertyCreateWorker = async (
  rabbitMqMessage: RabbitMqMessage,
  channel: Channel,
  message: Message,
  task: string,
) => {
  logger.info(`${taskPrefix} processing task ${task}`);

  const { units } = rabbitMqMessage.payload as UnitsPayload;

  try {
    const result = await index.saveObjects(units);

    logger.info(
      `${taskPrefix} success finished task ${task} created ${result.objectIDs.length} index objects ${JSON.stringify(result.objectIDs, null, 2)}`,
    );

    channel.ack(message);
  } catch (error) {
    logger.error(
      `${taskPrefix} error processing task ${task} cannot create index objects ${error}`,
    );
  }
};

export default propertyCreateWorker;
