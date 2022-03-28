import { TaskReference } from '../../models'

export interface TaskNext {
  tasks: TaskReference[],
  scenario: (...args: any[]) => void
}

export abstract class TaskContext {
  abstract next (task: TaskReference): TaskNext
  abstract getTasks (): TaskReference[]
}