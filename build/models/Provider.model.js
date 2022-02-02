"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
/**
 * Абстрактный класс для любого провайдера в приложении
 */
class Provider {
    /**
     * В текущей реализации используется Inversify контейнер
     */
    constructor(container) {
        this.container = container;
    }
}
exports.Provider = Provider;
//# sourceMappingURL=Provider.model.js.map