import { BaseProvider } from "../Core/BaseModel/BaseProvider";
import { connection } from '../Connections/rabbit'

export default class RabbitProvider extends BaseProvider {
  public register () {
    this.container.bind('rabbit').toConstantValue(connection)
  }

  public async init () {
    const connection = await this.container.getAsync('rabbit')
    this.container.rebind('rabbit').toConstantValue(connection)
  }

  public async ready () {}
}