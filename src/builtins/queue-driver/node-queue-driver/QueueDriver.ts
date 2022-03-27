import { QueueConnection } from "./QueueConnection"

export class QueueDriver {
  connections: QueueConnection[]
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

  public createConnection (connection: QueueConnection) {
    this.connections.push(connection)
  }

  public dropConnection (connection: QueueConnection) {
    this.connections = this.connections.filter(c => c.id === connection.id)
  }

  public registerMessage (message: any) {
    this.queue.unshift(message)
  }
}