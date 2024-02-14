/* eslint-disable no-console */
import { Channel, Message } from 'amqplib';

import { taskPrefix, tasks } from '@/constants';
import { index } from '@/providers/algolia';
import { logger } from '@/services';
import { MediaPayload, RabbitMqMessage } from '@/types';

const mediaInsertWorker = (
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

  index.partialUpdateObjects(objects).then(({ objectIDs }) => {
    logger.info(
      `${taskPrefix} success finished task ${tasks.media.insert} updated ${objectIDs.length} index objects`,
    );

    channel.ack(message);
  });
};

export default mediaInsertWorker;
