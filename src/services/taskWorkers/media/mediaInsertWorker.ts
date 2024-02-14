import { Channel, Message } from 'amqplib';

import { taskPrefix } from '@/constants';
import { index } from '@/providers/algolia';
import { logger } from '@/services';
import { MediaPayload, RabbitMqMessage } from '@/types';

const mediaInsertWorker = async (
  rabbitMqMessage: RabbitMqMessage,
  channel: Channel,
  message: Message,
  task: string,
) => {
  logger.info(`${taskPrefix} processing task ${task}`);

  const { imageId, unitIds } = rabbitMqMessage.payload as MediaPayload;

  const objects = unitIds.map((unitId) => ({
    objectID: unitId,
    imageId,
  }));

  try {
    const result = await index.partialUpdateObjects(objects);

    logger.info(
      `${taskPrefix} success finished task ${task} updated ${result.objectIDs.length} index objects ${JSON.stringify(result.objectIDs, null, 2)}`,
    );

    channel.ack(message);
  } catch (error) {
    logger.error(
      `${taskPrefix} error processing task ${task} cannot update index ${error}`,
    );
  }
};

export default mediaInsertWorker;
