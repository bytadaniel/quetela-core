import { Container } from 'inversify'

/**
 * Абстрактный класс для любого провайдера в приложении
 */
export abstract class BaseProvider {
  /**
   * В текущей реализации используется Inversify контейнер
   */
  constructor (protected readonly container: Container) {}

  /**
   * На этом этапе происходит регистрация зависимости в контейнере
   */
  abstract register(): void

  /**
   * Во время вызова этого метода все зависимости уже зарегистрированы, можно подождать асинхронную зависимость  
   */
  abstract init(): Promise<void>

  /**
   * Здесь можно реализовать какую-то свою логику, связанную с реализацией конкретной зависимости
   */
  abstract ready(): Promise<void>
}

export interface ProviderReference {
  new(container: Container): BaseProvider
}