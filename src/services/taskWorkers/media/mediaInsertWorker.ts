/* eslint-disable no-console */
import { Channel, Message } from 'amqplib';

import { taskPrefix, tasks } from '@/constants';
import { index } from '@/providers/algolia';
import { logger } from '@/services';
import { MediaPayload, RabbitMqMessage } from '@/types';

const mediaInsertWorker = async (
  rabbitMqMessage: RabbitMqMessage,
  channel: Channel,
  message: Message,
) => {
  logger.info(`${taskPrefix} processing task ${tasks.media.insert}`);

  const { imageId, unitIds } = rabbitMqMessage.payload as MediaPayload;

  const objects = unitIds.map((unitId) => ({
    objectID: unitId,
    imageId,
  }));

  try {
    const result = await index.partialUpdateObjects(objects);

    logger.info(
      `${taskPrefix} success finished task ${tasks.media.insert} updated ${result.objectIDs.length} index objects`,
    );

    channel.ack(message);
  } catch (error) {
    logger.error(
      `${taskPrefix} error processing task ${tasks.media.insert} cannot update index ${error}`,
    );
  }
};

export default mediaInsertWorker;
