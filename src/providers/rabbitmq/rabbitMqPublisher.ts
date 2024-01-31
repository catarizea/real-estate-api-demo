import amqp, { Channel, Connection } from 'amqplib/callback_api';

import { rabbitMqPrefix } from '@/constants';
import { logger } from '@/services';
import { RabbitMqMessage } from '@/types';

const cloudAmqpUrl = `${process.env.CLOUDAMQP_URL}`;

if (!cloudAmqpUrl) {
  throw new Error('Missing CLOUDAMQP_URL environment variable');
}

const rabbitMqPublisher = (queue: string) => {
  let channel: Channel;

  amqp.connect(
    cloudAmqpUrl,
    (connectionError: Error, connection: Connection) => {
      if (connectionError) {
        logger.error(
          `${rabbitMqPrefix} connection error ${connectionError.message}`,
        );
        return;
      }

      connection.createChannel((channelError: Error, newChannel: Channel) => {
        if (channelError) {
          logger.error(
            `${rabbitMqPrefix} channel error ${channelError.message}`,
          );
          return;
        }

        channel = newChannel;
      });
    },
  );

  return (message: RabbitMqMessage) => {
    if (!channel) {
      logger.error(`${rabbitMqPrefix} channel not initialized`);
      return;
    }

    const messageString = JSON.stringify(message);

    channel.sendToQueue(queue, Buffer.from(messageString));

    logger.info(
      `${rabbitMqPrefix} success message of type ${message.type} published to queue ${queue}`,
    );
  };
};

export default rabbitMqPublisher;
