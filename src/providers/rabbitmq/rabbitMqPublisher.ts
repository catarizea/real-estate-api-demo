import amqp from 'amqp-connection-manager';

import { rabbitMqPrefix } from '@/constants';
import { logger } from '@/services';
import { RabbitMqMessage } from '@/types';

const cloudAmqpUrl = `${process.env.CLOUDAMQP_URL}`;

if (!cloudAmqpUrl) {
  throw new Error('Missing CLOUDAMQP_URL environment variable');
}

const rabbitMqPublisher = async (queue: string) => {
  const connection = amqp.connect(cloudAmqpUrl);
  const channelWrapper = connection.createChannel({
    json: true,
  });

  return (message: RabbitMqMessage) => {
    logger.info(
      `${rabbitMqPrefix} publishing message of type ${message.type} to queue ${queue}`,
    );
    channelWrapper.sendToQueue(queue, message);
  };
};

export default rabbitMqPublisher;
