import { BaseProvider } from '../Core/BaseModel'
import { rabbitConnection } from '../Connections'

export class RabbitProvider extends BaseProvider {
  public register () {
    this.container.bind('rabbit').toConstantValue(rabbitConnection)
  }

  public async init () {
    const connection = await this.container.getAsync('rabbit')
    this.container.rebind('rabbit').toConstantValue(connection)
  }

  public async ready () {}
}