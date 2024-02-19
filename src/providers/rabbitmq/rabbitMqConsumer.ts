import amqp, { Channel } from 'amqp-connection-manager';
import { Message } from 'amqplib';

import { rabbitMqPrefix } from '@/constants';
import { logger, worker } from '@/services';
import { RabbitMqMessage } from '@/types';

const cloudAmqpUrl = `${process.env.CLOUDAMQP_URL}`;

if (!cloudAmqpUrl) {
  throw new Error('Missing CLOUDAMQP_URL environment variable');
}

const rabbitMqConsumer = async (queue: string) => {
  const connection = amqp.connect([cloudAmqpUrl]);

  connection.createChannel({
    json: true,
    setup: (channel: Channel) => {
      channel.assertQueue(queue, { durable: true });

      logger.info(`${rabbitMqPrefix} waiting for messages in queue ${queue}`);

      channel.consume(
        queue,
        (message: Message | null) => {
          if (!message) {
            logger.error(
              `${rabbitMqPrefix} message is null for queue ${queue}`,
            );
            return;
          }

          const messageString = message.content.toString();

          const rabbitMqMessage: RabbitMqMessage = JSON.parse(messageString);

          logger.info(
            `${rabbitMqPrefix} consuming message of type ${rabbitMqMessage.type} from queue ${queue}`,
          );

          worker(rabbitMqMessage, channel, message);
        },
        { noAck: false },
      );
    },
  });
};

export default rabbitMqConsumer;
