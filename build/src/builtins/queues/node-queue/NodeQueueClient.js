"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeQueueClient = void 0;
const NodeQueueDriver_1 = require("./NodeQueueDriver");
const NodeQueueConnection_1 = require("./NodeQueueConnection");
class NodeQueueClient {
    constructor(driver = new NodeQueueDriver_1.NodeQueueDriver()) {
        this.driver = driver;
        this.connection = undefined;
    }
    connect() {
        if (!this.connection) {
            this.connection = new NodeQueueConnection_1.NodeQueueConnection();
            this.driver.createConnection(this.connection);
        }
    }
    disconnect() {
        if (this.connection) {
            this.driver.dropConnection(this.connection);
        }
    }
    sendMessage(message) {
        this.driver.registerMessage(message);
    }
    assertQueue(_name) { }
}
exports.NodeQueueClient = NodeQueueClient;
