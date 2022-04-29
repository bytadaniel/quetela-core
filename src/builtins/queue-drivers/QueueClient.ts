import { Message } from "../../models/Message.model"

export abstract class QueueClient {
  abstract disconnect (): void
  abstract assertQueue (name: string): void
  abstract sendMessage (queue: string, message: Message): void
  abstract consume (onConsumed: (message: Message) => Promise<void>): void
}

// export interface QueueClientReference {
//   disconnect: () => void
//   assertQueue: (name: string) => void
//   sendMessage (queue: string, message: Message): void
//   consume (onConsumed: (message: Message) => void): void

//   new(): QueueClient;
// }