import amqp, { Channel, Connection, Message } from 'amqplib/callback_api';

import { rabbitMqPrefix } from '@/constants';
import { logger, worker } from '@/services';
import { RabbitMqMessage } from '@/types';

const cloudAmqpUrl = `${process.env.CLOUDAMQP_URL}`;

if (!cloudAmqpUrl) {
  throw new Error('Missing CLOUDAMQP_URL environment variable');
}

const rabbitMqConsumer = (queue: string) => {
  return () => {
    amqp.connect(
      cloudAmqpUrl,
      (connectionError: Error, connection: Connection) => {
        if (connectionError) {
          logger.error(
            `${rabbitMqPrefix} connection error ${connectionError.message}`,
          );
          return;
        }

        connection.createChannel((channelError: Error, channel: Channel) => {
          if (channelError) {
            logger.error(
              `${rabbitMqPrefix} channel error ${channelError.message}`,
            );
            return;
          }

          channel.assertQueue(queue, { durable: true });

          logger.info(
            `${rabbitMqPrefix} waiting for messages in queue ${queue}`,
          );

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

              const rabbitMqMessage: RabbitMqMessage =
                JSON.parse(messageString);

              logger.info(
                `${rabbitMqPrefix} message of type ${rabbitMqMessage.type} consumed from queue ${queue}`,
              );

              worker(rabbitMqMessage, channel, message);
            },
            { noAck: false },
          );
        });
      },
    );
  };
};

export default rabbitMqConsumer;
