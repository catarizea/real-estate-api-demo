import amqp from 'amqplib';

import { rabbitMqPrefix } from '@/constants';
import { logger } from '@/services';
import { RabbitMqMessage } from '@/types';

const cloudAmqpUrl = `${process.env.CLOUDAMQP_URL}`;

if (!cloudAmqpUrl) {
  throw new Error('Missing CLOUDAMQP_URL environment variable');
}

const rabbitMqPublisher = async (queue: string) => {
  const connection = await amqp.connect(cloudAmqpUrl);
  const channel = await connection.createChannel();

  return (message: RabbitMqMessage) => {
    const messageString = JSON.stringify(message);
    logger.info(`${rabbitMqPrefix} publishing message to queue ${queue}`);
    channel.sendToQueue(queue, Buffer.from(messageString));
  };
};

export default rabbitMqPublisher;
