import { NodeQueueDriver } from './NodeQueueDriver'
import { NodeQueueConnection } from './NodeQueueConnection'
import { QueueClient } from '../QueueClient'
import { Message } from 'models'

/**
 * Имплементация синтетического брокера сообщений QueueClient. Брокер может пригодиться, когда нужно что-то протестировать, но не хочется или не получается
 * подключить реальный брокер в качестве периферии
 */
export class NodeQueueClient extends QueueClient {
  public connection: NodeQueueConnection
  private driver: NodeQueueDriver

  constructor () {
    super()
    this.driver = new NodeQueueDriver()
    this.connection = new NodeQueueConnection()

    this.driver.createConnection(this.connection)
  }

  public disconnect () {
    if (this.connection) {
      this.driver.dropConnection(this.connection)
    }
  }

  public assertQueue (name: string) {
    this.driver.assertQueue(name)
  }

  public sendMessage (queue: string, message: Message) {
    this.driver.registerMessage(queue, message)
  }

  public consume (onConsumed: (message: Message) => Promise<void>) {
    this.connection.on('message', (message: Message) => {
      (async function () {
        await onConsumed(message)
      })()
    })
  }
}