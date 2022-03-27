import { QueueDriver } from './QueueDriver'
import { QueueConnection } from './QueueConnection'

export class QueueClient {
  public connection: QueueConnection
  private driver: QueueDriver

  constructor (
    ) {
    this.driver = new QueueDriver()
    this.connection = new QueueConnection()

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