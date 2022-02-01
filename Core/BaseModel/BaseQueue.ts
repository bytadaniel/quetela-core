import { RabbitConnection } from '../../Connections/rabbit'

export abstract class BaseQueue {
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
  new(): BaseQueue
}