import container from "../src/container"
import { QueueClient } from "../src/builtins/queue-driver/node-queue-driver";
import { Queue } from "../src/models/Queue.model";

export class MainQueue extends Queue {
  queueName = 'main-queue';
  connection = container.get<QueueClient>('node-queue')

  constructor () {
    super()
    this.connection.connection?.on('message', (message: any) => console.log({ message }))
  }
}