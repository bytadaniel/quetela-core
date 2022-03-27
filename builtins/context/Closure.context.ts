import { Task } from "../../models";
import { TaskContext } from "./Task.context";

export class ClosureTaskContext extends TaskContext {
  constructor (
    private readonly tasks: Task[],
  ) {
    super()
  }

  public getTasks () {
    return this.tasks
  }

  public next (task: Task): Task[] {
    const [firstTask] = this.tasks
    const currentTask = this.tasks.find(t => t.taskName === task.taskName)
    if (!currentTask) return []
    const currentTaskIndex = this.tasks.indexOf(currentTask)
    const nextTaskIndex = currentTaskIndex + 1
    const nextTask = this.tasks.find((_task, index) => index === nextTaskIndex)
    if (!nextTask) return [firstTask]
    return [nextTask]
  }
}