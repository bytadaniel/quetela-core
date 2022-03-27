"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeQueueClientConnection = void 0;
const node_queue_driver_1 = require("../queue-driver/node-queue-driver");
const nodeQueueClientConnection = new node_queue_driver_1.QueueClient();
exports.nodeQueueClientConnection = nodeQueueClientConnection;
