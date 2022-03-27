import { v4 as uuid } from 'uuid'
import { TaskContext } from "./Task.context"

export class GlobalContext {
  contexts: Map<string, TaskContext>
  taskContexts: Record<string, TaskContext[]>
  constructor () {
    this.contexts = new Map()
    this.taskContexts = {}
  }

  private bindTaskContexts (taskContext: TaskContext) {
    const tasks = taskContext.getTasks()
    tasks.forEach(task => {
      const exists = Boolean(this.taskContexts[task.taskName])
      if (!exists) {
        this.taskContexts[task.taskName] = []
      }
      this.taskContexts[task.taskName].push(taskContext)
    })
  }

  public getTaskContexts (taskName: string) {
    return this.taskContexts[taskName] ?? []
  }

  public createContext (context: TaskContext): string {
    const id = uuid()
    this.bindTaskContexts(context)
    this.contexts.set(id, context)
    return id
  }

  public dropContext (id: string) {
    if (this.contexts.has(id)) {
      this.contexts.delete(id)
    }
  }
}