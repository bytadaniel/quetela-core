import { BaseTask } from '../Core/BaseModel/BaseTask';
import RootQueue from '../Queues/RootQueue';

export default class RootTask extends BaseTask {
  public taskName: string = 'root_task'

  public queue = RootQueue

  public children = [RootTask]

  public async handler(payload: unknown): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  public async producer(result: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
