import { RabbitConnection } from '../Connections'
import { BaseQueue } from '../Core/BaseModel'
import { container } from '../Core/Container'

export default class RootQueue extends BaseQueue {
  queueName = 'root_queue'
  connection = container.get<Awaited<RabbitConnection>>('rabbit')
}