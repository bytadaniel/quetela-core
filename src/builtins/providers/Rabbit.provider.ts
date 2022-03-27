import { Provider } from '../../models'
import { RabbitConnection, rabbitConnection } from '..'
import Rabbit from '../connections/Rabbit.connection'

export class RabbitProvider extends Provider {
  public register () {
    this.container.bindSingleton<RabbitConnection>('rabbit', () => rabbitConnection)
  }

  public async init () {
    const connection = this.container.get<RabbitConnection>('rabbit')
    const rabbit = await connection
    this.container.rebindSingleton<Rabbit>('rabbit', () => rabbit)
  }

  public async ready () {}
}