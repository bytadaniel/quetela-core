import { NodeQueueDriver } from './NodeQueueDriver';
import { NodeQueueConnection } from './NodeQueueConnection';
export declare class NodeQueueClient {
    private readonly driver;
    connection?: NodeQueueConnection;
    constructor(driver?: NodeQueueDriver);
    connect(): void;
    disconnect(): void;
    sendMessage(message: any): void;
    assertQueue(_name: string): void;
}
