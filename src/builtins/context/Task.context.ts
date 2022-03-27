import { Task } from "../../models";

export abstract class TaskContext {
  abstract next (task: Task): Task[]
  abstract getTasks (): Task[]
}