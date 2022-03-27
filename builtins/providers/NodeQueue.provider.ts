import { Provider } from '../../models'
import { QueueClient } from '../queue-driver/node-queue-driver'

export class NodeQueueProvider extends Provider {
  public register () {
    this.container.bindSingleton<QueueClient>('node-queue', () => new QueueClient())
  }

  public async init () {
    // const connection = this.container.get<QueueClient>('node-queue')
  }

  public async ready () {}
}