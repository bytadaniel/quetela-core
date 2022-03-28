import { nodeMultipleSameChildsScenario } from '../handle-scenario/node-multiple-same-childs'
import { TaskReference } from "../../models";
import { TaskContext, TaskNext } from "./Task.context";

export class NodeManySameContext extends TaskContext {
  constructor (
    private readonly node: TaskReference,
    private readonly branch: TaskReference
  ) {
    super()
  }

  public getTasks () {
    return [this.branch]
  }

  public next (task: TaskReference): TaskNext {
    if (this.node.taskName === task.taskName) {
      return {
        scenario: nodeMultipleSameChildsScenario,
        tasks: [this.branch]
      }
    }
    return { scenario: nodeMultipleSameChildsScenario, tasks: [] }
  }
}