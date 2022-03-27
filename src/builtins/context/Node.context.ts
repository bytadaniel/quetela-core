import { TaskReference } from "../../models";
import { TaskContext } from "./Task.context";

export class NodeContext extends TaskContext {
  constructor (
    private readonly node: TaskReference,
    private readonly branches: TaskReference[]
  ) {
    super()
  }

  public getTasks () {
    return this.branches
  }

  public next(task: TaskReference): TaskReference[] {
    if (this.node.taskName === task.taskName) {
      return this.branches
    }
    return []
  }
}