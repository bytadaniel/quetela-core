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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ignitor = void 0;
const container_1 = __importDefault(require("../container"));
const hooks_1 = require("../hooks");
/**
 * Ignitor - это инициализатор приложения. Функция принимает ссылки на необходимые компоненты
 * после чего регистрирует все зависимости в Ioc контейнере и начинает прослушку задач
 */
function Ignitor({ providers = [], tasks = [] }) {
    return __awaiter(this, void 0, void 0, function* () {
        const providerInstances = providers.map(Provider => new Provider(container_1.default));
        const taskInstances = tasks.map(Task => new Task());
        yield (0, hooks_1.onProviderRegister)(providerInstances);
        yield (0, hooks_1.onProviderInit)(providerInstances);
        taskInstances.forEach(taskInstance => {
            const queueInstance = new taskInstance.queue();
            queueInstance.connection.assertQueue(queueInstance.queueName);
        });
        // TODO сделать подписку на задачи из реббита
        yield (0, hooks_1.onProviderReady)(providerInstances);
    });
}
exports.Ignitor = Ignitor;
