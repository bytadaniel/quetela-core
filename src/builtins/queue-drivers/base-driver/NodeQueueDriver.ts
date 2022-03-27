import { QueueConnection } from '../QueueConnection';
import { QueueDriver } from '../QueueDirver';
import { NodeQueueConnection } from './NodeQueueConnection'

export class NodeQueueDriver implements QueueDriver {
  connections: NodeQueueConnection[]
  queue: any[]

  constructor () {
    this.connections = []
    this.queue = []

    setInterval(() => this.processMessage(), 5000)
  }

  public processMessage () {
    const hasConnections = this.connections.length > 0
    const hasMessages = this.queue.length > 0

    if (hasConnections && hasMessages) {
      const idleConnectionIndex = this.connections.findIndex(c => c.idle)
      if (idleConnectionIndex === -1) return

      const message = this.queue.pop()

      this.connections[idleConnectionIndex].idle = false
      this.connections[idleConnectionIndex].triggerNotification(message)
      this.connections[idleConnectionIndex].idle = true
    }
  }

  public createConnection (connection: NodeQueueConnection) {
    this.connections.push(connection)
  }

  public dropConnection (connection: NodeQueueConnection) {
    this.connections = this.connections.filter(c => c.id === connection.id)
  }

  public registerMessage (message: any) {
    this.queue.unshift(message)
  }
}