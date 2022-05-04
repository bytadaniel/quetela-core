import { chainScenario } from "../../builtins/handle-scenario/chain"
import { TaskReference } from "../../models"
import { TaskContext, TaskNext } from "./Task.context"

/**
 * ChainContext - это контекст, принимающий список задач и 
 * передающий управление каждой задаче по цепочке в предопределенном списком порядке
 * Контекст накапливает результат выполнения предыдущих задач
 */
export class ChainContext extends TaskContext {
  constructor (
    private readonly tasks: TaskReference[]
  ) {
    super()
  }

  public getTasks () {
    return this.tasks
  }

  public next (task: TaskReference): TaskNext {
    const currentTask = this.tasks.find(t => t.taskName === task.taskName)
    if (!currentTask) return { scenario: chainScenario, tasks: [] }
    const currentTaskIndex = this.tasks.indexOf(currentTask)
    const nextTaskIndex = currentTaskIndex + 1
    const nextTask = this.tasks.find((_task, index) => index === nextTaskIndex)
    if (!nextTask) return { scenario: chainScenario, tasks: [] }
    return { scenario: chainScenario, tasks: [nextTask] }
  }
}