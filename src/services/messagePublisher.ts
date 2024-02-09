import { rabbitMqQueue } from '@/constants';
import { rabbitMqPublisher } from '@/providers/rabbitmq';
import { RabbitMqMessage } from '@/types';

const messagePublisher = (message: RabbitMqMessage) =>
  rabbitMqPublisher(rabbitMqQueue)(message);

export default messagePublisher;
