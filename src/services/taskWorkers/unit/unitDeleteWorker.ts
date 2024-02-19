import { Channel, Message } from 'amqplib';

import { taskPrefix } from '@/constants';
import { index } from '@/providers/algolia';
import { logger } from '@/services';
import { RabbitMqMessage } from '@/types';

const unitDeleteWorker = async (
  rabbitMqMessage: RabbitMqMessage,
  channel: Channel,
  message: Message,
  task: string,
) => {
  logger.info(`${taskPrefix} processing task ${task}`);

  const { id } = rabbitMqMessage.payload as { id: string };

  try {
    const result = await index.deleteObjects([id]);

    logger.info(
      `${taskPrefix} success finished task ${task} deleted ${result.objectIDs.length} index objects ${JSON.stringify(result.objectIDs, null, 2)}`,
    );

    channel.ack(message);
  } catch (error) {
    logger.error(
      `${taskPrefix} error processing task ${task} cannot delete index objects ${error}`,
    );
  }
};

export default unitDeleteWorker;
