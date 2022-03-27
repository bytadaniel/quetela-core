"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueClient = void 0;
const QueueDriver_1 = require("./QueueDriver");
const QueueConnection_1 = require("./QueueConnection");
class QueueClient {
    constructor() {
        this.driver = new QueueDriver_1.QueueDriver();
        this.connection = new QueueConnection_1.QueueConnection();
        this.driver.createConnection(this.connection);
    }
    disconnect() {
        if (this.connection) {
            this.driver.dropConnection(this.connection);
        }
    }
    sendMessage(message) {
        this.driver.registerMessage(message);
    }
    consume(onConsumed) {
        this.connection.on('message', (message) => onConsumed(message));
    }
}
exports.QueueClient = QueueClient;
