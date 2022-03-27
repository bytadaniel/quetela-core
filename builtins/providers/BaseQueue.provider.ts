import { Provider } from '../../models'
import { NodeQueueClient } from '../queue-drivers/base-driver'

export class NodeQueueProvider extends Provider {
  public register () {
    this.container.bindSingleton<NodeQueueClient>('node-queue', () => new NodeQueueClient())
  }

  public async init () {}

  public async ready () {}
}