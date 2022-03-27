"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueConnection = void 0;
const uuid_1 = require("uuid");
const events_1 = require("events");
class QueueConnection extends events_1.EventEmitter {
    constructor() {
        super();
        this.id = (0, uuid_1.v4)();
        this.idle = true;
    }
    triggerNotification(message) {
        this.emit('message', message);
    }
}
exports.QueueConnection = QueueConnection;
