"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitConnection = void 0;
class Rabbit {
    sendToQueue(..._args) { }
    assertQueue(..._args) { }
}
exports.default = Rabbit;
const rabbitConnection = new Promise(resolve => resolve(new Rabbit()));
exports.rabbitConnection = rabbitConnection;
//# sourceMappingURL=Rabbit.connection.js.map