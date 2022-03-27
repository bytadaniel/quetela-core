import { Provider } from '../../models'
import { nodeQueueClientConnection } from '../connections'
import { NodeQueueClient } from '../queue-driver/node-queue-driver'

export class NodeQueueProvider extends Provider {
  public register () {
    this.container.bindSingleton('node-queue', () => nodeQueueClientConnection)
  }

  public async init () {
    const connection = this.container.get<NodeQueueClient>('node-queue')
    connection.connect()
  }

  public async ready () {}
}