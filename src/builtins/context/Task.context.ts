import { TaskReference } from '../../models'

/**
 * Абстрактный класс для создания своих собственных контекстов
 */
export abstract class TaskContext {
  abstract next (task: TaskReference): TaskNext
  abstract getTasks (): TaskReference[]
}
export interface TaskNext {
  tasks: TaskReference[],
  scenario: (...args: any[]) => void
}