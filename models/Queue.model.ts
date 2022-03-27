import { NodeQueueClient } from '../builtins/queue-drivers/base-driver';

export abstract class Queue {
  /**
   * Имя очереди задач, которое будет зарегистрировано в реббите
   */
  abstract queueName: string;
  /**
   * Инстанс подключения к реббиту
   */
  abstract connection: NodeQueueClient
}

export interface QueueReference {
  new(): Queue
}