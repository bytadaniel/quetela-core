import { NodeQueueDriver } from './NodeQueueDriver'
import { NodeQueueConnection } from './NodeQueueConnection'

export class NodeQueueClient {
  public connection?: NodeQueueConnection

  constructor (
    private readonly driver: NodeQueueDriver = new NodeQueueDriver()
  ) {
    this.connection = undefined
  }

  public connect () {
    if (!this.connection) {
      this.connection = new NodeQueueConnection()
      this.driver.createConnection(this.connection)
    }
  }

  public disconnect () {
    if (this.connection) {
      this.driver.dropConnection(this.connection)
    }
  }

  public sendMessage (message: any) {
    this.driver.registerMessage(message)
  }

  public assertQueue (_name: string) {}
}