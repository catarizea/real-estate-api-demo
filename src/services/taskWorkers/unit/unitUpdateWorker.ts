import { Channel, Message } from 'amqplib';

import { taskPrefix } from '@/constants';
import { index } from '@/providers/algolia';
import { logger } from '@/services';
import { RabbitMqMessage, UnitUpdateIndexFragment } from '@/types';

const unitUpdateWorker = async (
  rabbitMqMessage: RabbitMqMessage,
  channel: Channel,
  message: Message,
  task: string,
) => {
  logger.info(`${taskPrefix} processing task ${task}`);

  const { unit } = rabbitMqMessage.payload as {
    unit: UnitUpdateIndexFragment;
  };

  try {
    const result = await index.partialUpdateObjects([unit]);

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

export default unitUpdateWorker;
