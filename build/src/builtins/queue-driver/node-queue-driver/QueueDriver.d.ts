import { QueueConnection } from "./QueueConnection";
export declare class QueueDriver {
    connections: QueueConnection[];
    queue: any[];
    constructor();
    processMessage(): void;
    createConnection(connection: QueueConnection): void;
    dropConnection(connection: QueueConnection): void;
    registerMessage(message: any): void;
}
