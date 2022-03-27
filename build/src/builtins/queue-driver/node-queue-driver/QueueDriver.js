"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueDriver = void 0;
class QueueDriver {
    constructor() {
        this.connections = [];
        this.queue = [];
        setInterval(() => this.processMessage(), 5000);
    }
    processMessage() {
        const hasConnections = this.connections.length > 0;
        const hasMessages = this.queue.length > 0;
        if (hasConnections && hasMessages) {
            const idleConnectionIndex = this.connections.findIndex(c => c.idle);
            if (idleConnectionIndex === -1)
                return;
            const message = this.queue.pop();
            this.connections[idleConnectionIndex].idle = false;
            this.connections[idleConnectionIndex].triggerNotification(message);
            this.connections[idleConnectionIndex].idle = true;
        }
    }
    createConnection(connection) {
        this.connections.push(connection);
    }
    dropConnection(connection) {
        this.connections = this.connections.filter(c => c.id === connection.id);
    }
    registerMessage(message) {
        this.queue.unshift(message);
    }
}
exports.QueueDriver = QueueDriver;
