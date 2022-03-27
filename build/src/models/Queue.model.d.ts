import { QueueClient } from '../builtins/queue-driver/node-queue-driver';
export declare abstract class Queue {
    /**
     * Имя очереди задач, которое будет зарегистрировано в реббите
     */
    abstract queueName: string;
    /**
     * Инстанс подключения к реббиту
     */
    abstract connection: QueueClient;
}
export interface QueueReference {
    new (): Queue;
}
