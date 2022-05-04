import amqp from 'amqplib'
import { QueueClient } from '../QueueClient'
import { Message } from 'models'
import { QueueReference } from 'models'

/**
 * Имплементация QueueClient для AMQP протокола
 */
export class AmqpClient extends QueueClient {
  driver: {}
  connection?: amqp.Connection
  prodChannel?: amqp.Channel
  consChannel?: amqp.Channel

  constructor (
    public readonly url: string,
    public readonly queue: QueueReference
  ) {
    super()
    this.driver = {}
    amqp.connect(url)
      .then(async connection => {
        this.prodChannel = await connection.createChannel()
        this.consChannel = await connection.createChannel()
        this.connection = connection
      }) 
  }

  public disconnect () {
    if (this.connection) {
      this.connection.close()
    }
  }

  public assertQueue (name: string) {
    this.prodChannel?.assertQueue(name)
  }

  public sendMessage (queue: string, message: Message) {
    this.prodChannel?.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
  }

  public consume (onConsumed: (message: Message) => Promise<void>) {
    this.consChannel?.consume(this.queue.queueName, async (amqpMessage) => {
      await onConsumed(JSON.parse(amqpMessage!.content.toString()))
    })
  }
}