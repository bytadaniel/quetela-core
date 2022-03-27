import { Task } from "../../models";
import { TaskContext } from "./Task.context";

export class NodeContext extends TaskContext {
  constructor (
    private readonly node: Task,
    private readonly branches: Task[]
  ) {
    super()
  }

  public getTasks () {
    return this.branches
  }

  public next(task: Task): Task[] {
    if (this.node.taskName === task.taskName) {
      return this.branches
    }
    return []
  }
}