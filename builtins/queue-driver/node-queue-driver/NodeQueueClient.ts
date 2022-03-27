import { NodeQueueDriver } from './NodeQueueDriver'
import { NodeQueueConnection } from './NodeQueueConnection'
import { QueueDriver } from '../QueueDirver'

export class QueueClient implements QueueClient {
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

  public sendMessage (message: any) {
    this.driver.registerMessage(message)
  }

  public consume (onConsumed: (message: any) => void) {
    this.connection.on('message', (message: any) => onConsumed(message))
  }
}