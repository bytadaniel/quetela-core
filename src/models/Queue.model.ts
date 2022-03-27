import { QueueClient } from '../builtins/queue-drivers';

export abstract class Queue {
  /**
   * Имя очереди задач, которое будет зарегистрировано в реббите
   */
  static queueName: string;
  /**
   * Инстанс подключения к реббиту
   */
  static connection: QueueClient
}

// export interface QueueReference {
//   queueName: string
//   new(): Queue
// }