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
exports.Ioc = void 0;
class Ioc {
    constructor() {
        this.instances = {};
    }
    bindInstance(name, getInstance, singleton, safe = false) {
        const exists = Boolean(this.instances[name]);
        if (exists && safe)
            throw new Error(`Instance ${name} already exists`);
        this.instances[name] = { name, getInstance, singleton };
    }
    bind(name, instanceCb) {
        this.bindInstance(name, instanceCb, false, true);
    }
    rebind(name, instanceCb) {
        this.bindInstance(name, instanceCb, false, false);
    }
    bindSingleton(name, instanceCb) {
        const instance = instanceCb();
        this.bindInstance(name, () => instance, true, true);
    }
    rebindSingleton(name, instanceCb) {
        const instance = instanceCb();
        this.bindInstance(name, () => instance, true, false);
    }
    get(name) {
        const exists = Boolean(this.instances[name]);
        if (!exists)
            throw new Error(`Instance ${name} does not exist`);
        return this.instances[name].getInstance();
    }
    getAsync(name, doAsync) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = Boolean(this.instances[name]);
            if (!exists)
                throw new Error(`Instance ${name} does not exist`);
            const instance = this.instances[name].getInstance();
            yield doAsync(instance);
            return instance;
        });
    }
}
exports.Ioc = Ioc;
