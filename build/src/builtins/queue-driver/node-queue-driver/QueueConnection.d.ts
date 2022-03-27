/// <reference types="@types/node" />
import { EventEmitter } from 'events';
export declare class QueueConnection extends EventEmitter {
    readonly id: string;
    idle: boolean;
    constructor();
    triggerNotification(message: any): void;
}
