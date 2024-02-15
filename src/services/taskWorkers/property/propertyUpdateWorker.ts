import { Channel, Message } from 'amqplib';

import { taskPrefix } from '@/constants';
import { index } from '@/providers/algolia';
import { logger } from '@/services';
import { PropertyPartialPayload, RabbitMqMessage } from '@/types';

const propertyUpdateWorker = async (
  rabbitMqMessage: RabbitMqMessage,
  channel: Channel,
  message: Message,
  task: string,
) => {
  logger.info(`${taskPrefix} processing task ${task}`);

  const { property, unitIds } =
    rabbitMqMessage.payload as PropertyPartialPayload;

  const objects = unitIds.map((unitId) => ({
    objectID: unitId,
    ...property,
  }));

  try {
    const result = await index.partialUpdateObjects(objects);

    logger.info(
      `${taskPrefix} success finished task ${task} updated ${result.objectIDs.length} index objects ${JSON.stringify(result.objectIDs, null, 2)}`,
    );

    channel.ack(message);
  } catch (error) {
    logger.error(
      `${taskPrefix} error processing task ${task} cannot update index objects ${error}`,
    );
  }
};

export default propertyUpdateWorker;
