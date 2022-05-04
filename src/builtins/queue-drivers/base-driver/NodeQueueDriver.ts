import { Message } from 'models';
import { QueueConnection } from '../QueueConnection';
import { QueueDriver } from '../QueueDirver';
import { NodeQueueConnection } from './NodeQueueConnection'

export class NodeQueueDriver implements QueueDriver {
  connections: NodeQueueConnection[]
  queues: string[]
  messages: { queue: string, message: any }[] // не для продакшена

  constructor () {
    this.connections = []
    this.queues = []
    this.messages = []

    setInterval(() => this.processMessage(), 50)
  }

  public processMessage () {
    const hasConnections = this.connections.length > 0
    const hasMessages = this.messages.length > 0

    if (hasConnections && hasMessages) {
      const idleConnectionIndex = this.connections.findIndex(c => c.idle)
      if (idleConnectionIndex === -1) return

      const message = this.messages.pop()!

      this.connections[idleConnectionIndex].idle = false
      this.connections[idleConnectionIndex].triggerNotification(message.message)
      this.connections[idleConnectionIndex].idle = true
    }
  }

  public createConnection (connection: NodeQueueConnection) {
    this.connections.push(connection)
  }

  public dropConnection (connection: NodeQueueConnection) {
    this.connections = this.connections.filter(c => c.id === connection.id)
  }

  public registerMessage (queue: string, message: Message) {
    this.messages.unshift({ queue, message })
  }

  public assertQueue(name: string) {
    if (!this.queues.includes(name)) {
      this.queues.push(name)
    }
  }
}