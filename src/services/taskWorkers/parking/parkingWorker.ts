import { Channel, Message } from 'amqplib';

import { taskPrefix } from '@/constants';
import { index } from '@/providers/algolia';
import { logger } from '@/services';
import { ParkingPayload, RabbitMqMessage } from '@/types';

const parkingWorker = async (
  rabbitMqMessage: RabbitMqMessage,
  channel: Channel,
  message: Message,
  task: string,
) => {
  logger.info(`${taskPrefix} processing task ${task}`);

  const { parking, unitIds } = rabbitMqMessage.payload as ParkingPayload;

  const objects = unitIds.map((unitId) => ({
    objectID: unitId,
    parking,
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

export default parkingWorker;
