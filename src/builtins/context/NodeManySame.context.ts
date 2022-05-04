import { nodeMultipleSameChildsScenario } from '../handle-scenario/node-multiple-same-childs'
import { TaskReference } from "../../models";
import { TaskContext, TaskNext } from "./Task.context";

/**
* NodeManySameContext - это контекст, который принимает задачу-узел и задачу-ветвь
* После выполнения задачи-узла контекст передается каждой задаче-ветви
*/

export class NodeManySameContext extends TaskContext {
  constructor (
    private readonly node: TaskReference,
    private readonly branch: TaskReference
  ) {
    super()
  }

  public getTasks () {
    return [this.node, this.branch]
  }

  public next (task: TaskReference): TaskNext {
    if (this.node.taskName === task.taskName) {
      return {
        scenario: nodeMultipleSameChildsScenario, tasks: [this.branch]
      }
    }
    return { scenario: nodeMultipleSameChildsScenario, tasks: [] }
  }
}