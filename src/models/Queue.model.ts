import { RabbitConnection } from '../builtins'

export abstract class Queue {
  /**
   * Имя очереди задач, которое будет зарегистрировано в реббите
   */
  abstract queueName: string;
  /**
   * Инстанс подключения к реббиту
   */
  abstract connection: Awaited<RabbitConnection>
}

export interface QueueReference {
  new(): Queue
}