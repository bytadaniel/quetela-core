import { NodeQueueConnection } from "./NodeQueueConnection";
export declare class NodeQueueDriver {
    connections: NodeQueueConnection[];
    queue: any[];
    constructor();
    processMessage(): void;
    createConnection(connection: NodeQueueConnection): void;
    dropConnection(connection: NodeQueueConnection): void;
    registerMessage(message: any): void;
}
