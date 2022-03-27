import { NodeQueueDriver } from './NodeQueueDriver'
import { NodeQueueConnection } from './NodeQueueConnection'
import { QueueClient } from '../QueueClient'
import { Message } from 'models/Message.model'

export class NodeQueueClient implements QueueClient {
  public connection: NodeQueueConnection
  private driver: NodeQueueDriver

  constructor (
    ) {
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

  public consume (onConsumed: (message: Message) => void) {
    this.connection.on('message', (message: Message) => onConsumed(message))
  }
}