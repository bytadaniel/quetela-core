import { BaseProvider } from "../Core/BaseModel/BaseProvider";
import { connection } from '../Connections/clickhouse'

export default class ClickhouseProvider extends BaseProvider {
  public register () {
    this.container.bind('clickhouse').toConstantValue(connection)
  }

  public async init () {
    const connection = await this.container.getAsync('clickhouse')
    this.container.rebind('clickhouse').toConstantValue(connection)
  }

  public async ready () {}
}