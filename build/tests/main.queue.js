"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainQueue = void 0;
const container_1 = __importDefault(require("../src/container"));
const Queue_model_1 = require("../src/models/Queue.model");
class MainQueue extends Queue_model_1.Queue {
    constructor() {
        var _a;
        super();
        this.queueName = 'main-queue';
        this.connection = container_1.default.get('node-queue');
        (_a = this.connection.connection) === null || _a === void 0 ? void 0 : _a.on('message', (message) => console.log({ message }));
    }
}
exports.MainQueue = MainQueue;
