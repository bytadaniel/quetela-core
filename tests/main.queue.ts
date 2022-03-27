import container from "../container"
import { QueueClient } from "../builtins/queue-driver/node-queue-driver"
import { Queue } from "../models/Queue.model"

export class MainQueue extends Queue {
  queueName = 'main-queue';
  connection = container.get<QueueClient>('node-queue')

  constructor () {
    super()
    this.connection.connection?.on('message', (message: any) => console.log({ message }))
  }
}