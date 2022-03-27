import { QueueConnection } from './QueueConnection';
export declare class QueueClient {
    connection: QueueConnection;
    private driver;
    constructor();
    disconnect(): void;
    sendMessage(message: any): void;
    consume(onConsumed: (message: any) => void): void;
}
