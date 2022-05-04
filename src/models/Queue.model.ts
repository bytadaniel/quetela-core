export abstract class Queue {
  /**
   * Имя очереди задач, которое будет зарегистрировано в реббите
   */
  static queueName: string;
}

export interface QueueReference {
  /**
   * Имя очереди задач, которое будет зарегистрировано в реббите
   */
  queueName: string
  new(): void
}