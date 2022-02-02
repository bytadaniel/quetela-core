import { Provider } from '../../models'
import { rabbitConnection } from '..'

export class RabbitProvider extends Provider {
  public register () {
    this.container.bind('rabbit').toConstantValue(rabbitConnection)
  }

  public async init () {
    const connection = await this.container.getAsync('rabbit')
    this.container.rebind('rabbit').toConstantValue(connection)
  }

  public async ready () {}
}