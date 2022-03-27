import { Ioc } from 'src/container/Ioc'
import { Provider } from '../../models'
import { NodeQueueClient } from '../queue-drivers/base-driver'

export class BaseQueueProvider extends Provider {
  constructor(container: Ioc) {
    super(container)
  }

  public register () {
    this.container.bindSingleton<NodeQueueClient>('node-queue', () => new NodeQueueClient())
  }

  public async init () {}

  public async ready () {}
}