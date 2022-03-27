import { v4 as uuid } from 'uuid'
import { EventEmitter } from 'events'
import { QueueConnection } from '../QueueConnection'

export class NodeQueueConnection extends EventEmitter implements QueueConnection {
  readonly id: string
  public idle: boolean

  constructor () {
    super()
    this.id = uuid()
    this.idle = true
  }

  public triggerNotification (message: any) {
    this.emit('message', message)
  }
}