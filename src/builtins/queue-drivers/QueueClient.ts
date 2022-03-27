import { Message } from "../../models/Message.model"

export interface QueueClient {
  disconnect: () => void
  assertQueue: (name: string) => void
  sendMessage (queue: string, message: Message): void
  consume (onConsumed: (message: Message) => void): void
}

export interface QueueClientReference {
  new(): QueueClient;
}