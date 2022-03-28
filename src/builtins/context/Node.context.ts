import { nodeMultipleSameChildsScenario } from "../../builtins/handle-scenario/node-multiple-same-childs";
import { TaskReference } from "../../models";
import { TaskContext, TaskNext } from "./Task.context";

export class NodeContext extends TaskContext {
  constructor (
    private readonly node: TaskReference,
    private readonly branches: TaskReference[]
  ) {
    super()
  }

  public getTasks () {
    return [this.node, ...this.branches]
  }

  public next (task: TaskReference): TaskNext {
    if (this.node.taskName === task.taskName) {
      return { scenario: nodeMultipleSameChildsScenario, tasks: this.branches }
    }
    return { scenario: nodeMultipleSameChildsScenario, tasks: [] }
  }
}