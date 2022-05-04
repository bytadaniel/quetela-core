import { closureScenario } from "../../builtins/handle-scenario/closure"
import { TaskReference } from "../../models";
import { TaskContext, TaskNext } from "./Task.context";

/**
 * ClosureContext - это контекст, получающий список задач и работающий по такому же принципу, как ChainContext
 * Разница в том, что после выполнения последней задачи контекст зацикливается 
 */
export class ClosureTaskContext extends TaskContext {
  constructor (
    private readonly tasks: TaskReference[],
  ) {
    super()
  }

  public getTasks () {
    return this.tasks
  }

  public next (task: TaskReference): TaskNext {
    const [firstTask] = this.tasks
    const currentTask = this.tasks.find(t => t.taskName === task.taskName)
    if (!currentTask) return { scenario: closureScenario, tasks: []}
    const currentTaskIndex = this.tasks.indexOf(currentTask)
    const nextTaskIndex = currentTaskIndex + 1
    const nextTask = this.tasks.find((_task, index) => index === nextTaskIndex)
    if (!nextTask) return { scenario: closureScenario, tasks: [firstTask] }
    return { scenario: closureScenario, tasks: [firstTask] }
  }
}