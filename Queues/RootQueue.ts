import rabbit, { RabbitConnection } from "../Connections/rabbit";
import { BaseQueue } from "../Core/BaseModel/BaseQueue";
import { container } from "../Core/Container/container";

export default class RootQueue extends BaseQueue {
  queueName = 'root_queue'
  connection = container.get<Awaited<RabbitConnection>>('rabbit')
}