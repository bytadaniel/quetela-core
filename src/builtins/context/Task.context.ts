import { TaskReference } from "../../models";

export abstract class TaskContext {
  abstract next (task: TaskReference): TaskReference[]
  abstract getTasks (): TaskReference[]
}