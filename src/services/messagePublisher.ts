import { rabbitMqQueue } from '@/constants';
import { rabbitMqPublisher } from '@/providers/rabbitmq';
import { RabbitMqMessage } from '@/types';

const messagePublisher = async (message: RabbitMqMessage) => {
  const publisher = await rabbitMqPublisher(rabbitMqQueue);
  publisher(message);
};

export default messagePublisher;
