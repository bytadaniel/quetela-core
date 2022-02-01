import { BaseProvider } from "../Core/BaseModel";
import { clickhouseConnection } from '../Connections'

export class ClickhouseProvider extends BaseProvider {
  public register () {
    this.container.bind('clickhouse').toConstantValue(clickhouseConnection)
  }

  public async init () {
    const connection = await this.container.getAsync('clickhouse')
    this.container.rebind('clickhouse').toConstantValue(connection)
  }

  public async ready () {}
}