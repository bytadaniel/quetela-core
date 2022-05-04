import { Ioc } from '../container/Ioc'
export interface Provider {
  /**
   * На этом этапе происходит регистрация зависимости в контейнере
   */
  register: () => void,
  /**
   * Во время вызова этого метода все зависимости уже зарегистрированы, можно подождать асинхронную зависимость  
   */
  init: () => Promise<void>,
  /**
   * Здесь можно реализовать какую-то свою логику, связанную с реализацией конкретной зависимости
   */
  ready: () => Promise<void>
}

export interface ProviderReference {
  /**
   * В текущей реализации используется собственный Ioc контейнер
   */
  new(container: Ioc): Provider
}