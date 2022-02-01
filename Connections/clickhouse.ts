export default class Clickhouse {
  public query (..._args: any[]) {}

  public insert (..._args: any[]) {}
}

export type ClickhHuseConnection = Promise<Clickhouse>

const connection: ClickhHuseConnection = new Promise(resolve => resolve(new Clickhouse()))

export { connection }