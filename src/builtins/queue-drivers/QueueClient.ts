import { Message } from "../../models/Message.model"

export abstract class QueueClient {
  abstract disconnect (): void
  abstract assertQueue (name: string): void
  abstract sendMessage (queue: string, message: Message): void
  abstract consume (onConsumed: (message: Message) => Promise<void>): void
}