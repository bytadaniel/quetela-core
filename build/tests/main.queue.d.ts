import { QueueClient } from "../src/builtins/queue-driver/node-queue-driver";
import { Queue } from "../src/models/Queue.model";
export declare class MainQueue extends Queue {
    queueName: string;
    connection: QueueClient;
    constructor();
}
