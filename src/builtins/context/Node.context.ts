import { Task } from "../../models";
import { TaskContext } from "./Task.context";

export class NodeContext extends TaskContext {
  constructor (
    private readonly node: typeof Task,
    private readonly branches: typeof Task[]
  ) {
    super()
  }

  public getTasks () {
    return this.branches
  }

  public next(task: typeof Task): typeof Task[] {
    if (this.node.taskName === task.taskName) {
      return this.branches
    }
    return []
  }
}