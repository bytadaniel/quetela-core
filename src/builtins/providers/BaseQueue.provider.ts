import { Ioc } from '../../container/Ioc'
import { Provider } from '../../models'
import { NodeQueueClient } from '../queue-drivers/base-driver'

export class BaseQueueProvider implements Provider {
  constructor(private container: Ioc) {}

  public register () {
    this.container.bindSingleton<NodeQueueClient>('node-queue', () => new NodeQueueClient())
  }

  public async init () {}

  public async ready () {}
}