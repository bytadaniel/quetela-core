import { QueueClient } from '../builtins/queue-drivers';

export abstract class Queue {
  /**
   * Имя очереди задач, которое будет зарегистрировано в реббите
   */
  static queueName: string;
  // /**
  //  * Инстанс подключения к реббиту
  //  */
  // static connection: QueueClient
}

export interface QueueReference {
  /**
   * Имя очереди задач, которое будет зарегистрировано в реббите
   */
  queueName: string

  // /**
  //  * Инстанс подключения к реббиту
  //  */
  // connection: QueueClient

  new(): void
}