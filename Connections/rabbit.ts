export default class Rabbit {
  public sendToQueue (..._args: any[]) {}

  public assertQueue (..._args: any[]) {}
}

export type RabbitConnection = Promise<Rabbit>

const rabbitConnection: RabbitConnection = new Promise(resolve => resolve(new Rabbit()))

export { rabbitConnection }
