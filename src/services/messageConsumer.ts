import { rabbitMqQueue } from '@/constants';
import { rabbitMqConsumer } from '@/providers/rabbitmq';

rabbitMqConsumer(rabbitMqQueue);
