"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeQueueProvider = void 0;
const models_1 = require("../../models");
const node_queue_driver_1 = require("../queue-driver/node-queue-driver");
class NodeQueueProvider extends models_1.Provider {
    register() {
        this.container.bindSingleton('node-queue', () => new node_queue_driver_1.QueueClient());
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // const connection = this.container.get<QueueClient>('node-queue')
        });
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.NodeQueueProvider = NodeQueueProvider;
