import { Task } from "../../models";

export abstract class TaskContext {
  abstract next (task: typeof Task): typeof Task[]
  abstract getTasks (): typeof Task[]
}