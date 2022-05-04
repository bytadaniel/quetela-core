import { Message } from './../../models'

/**
 * Абстрактный класс клиента брокера сообщений. С помощью QueueClient можно создавать любые возможные клиенты для работы с quetela
 */
export abstract class QueueClient {
  /**
   * Отключение от брокера
   */
  abstract disconnect (): void
  /**
   * Регистрация очереди в брокере сообщений
   */
  abstract assertQueue (name: string): void
  /**
   * Отправка сообщения брокеру
   */
  abstract sendMessage (queue: string, message: Message): void
  /**
   * Подписка на получение сообщений от брокера
   */
  abstract consume (onConsumed: (message: Message) => Promise<void>): void
}