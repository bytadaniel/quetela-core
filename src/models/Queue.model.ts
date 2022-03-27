import { NodeQueueClient } from '../builtins/queue-driver/node-queue-driver';

export abstract class Queue {
  /**
   * Имя очереди задач, которое будет зарегистрировано в реббите
   */
  abstract queueName: string;
  /**
   * Инстанс подключения к реббиту
   */
  // abstract connection: Awaited<RabbitConnection>
  abstract connection: NodeQueueClient
}

export interface QueueReference {
  new(): Queue
}