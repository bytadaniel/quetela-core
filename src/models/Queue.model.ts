import { QueueClient } from '../builtins/queue-drivers';

export abstract class AbstractQueue {
  /**
   * Имя очереди задач, которое будет зарегистрировано в реббите
   */
  static queueName: string;
  /**
   * Инстанс подключения к реббиту
   */
  static connection: QueueClient
}

export interface Queue {
  queueName: string
  connection: QueueClient

  new(): AbstractQueue
}