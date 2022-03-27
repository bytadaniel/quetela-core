export interface QueueClient {
  disconnect: () => void
  sendMessage(message: any): void
  consume(onConsumed: (message: any) => void): void
}

export interface QueueClientReference {
  new(): QueueClient;
}