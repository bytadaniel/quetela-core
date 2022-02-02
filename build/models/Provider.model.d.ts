import { Container } from 'inversify';
/**
 * Абстрактный класс для любого провайдера в приложении
 */
export declare abstract class Provider {
    protected readonly container: Container;
    /**
     * В текущей реализации используется Inversify контейнер
     */
    constructor(container: Container);
    /**
     * На этом этапе происходит регистрация зависимости в контейнере
     */
    abstract register(): void;
    /**
     * Во время вызова этого метода все зависимости уже зарегистрированы, можно подождать асинхронную зависимость
     */
    abstract init(): Promise<void>;
    /**
     * Здесь можно реализовать какую-то свою логику, связанную с реализацией конкретной зависимости
     */
    abstract ready(): Promise<void>;
}
export interface ProviderReference {
    new (container: Container): Provider;
}
//# sourceMappingURL=Provider.model.d.ts.map