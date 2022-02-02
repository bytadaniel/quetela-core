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
exports.RabbitProvider = void 0;
const models_1 = require("../../models");
const __1 = require("..");
class RabbitProvider extends models_1.Provider {
    register() {
        this.container.bind('rabbit').toConstantValue(__1.rabbitConnection);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.container.getAsync('rabbit');
            this.container.rebind('rabbit').toConstantValue(connection);
        });
    }
    ready() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.RabbitProvider = RabbitProvider;
//# sourceMappingURL=Rabbit.provider.js.map