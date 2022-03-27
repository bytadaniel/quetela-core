export interface Message<T = any> {
  taskName: string,
  attempt: number,
  data: T
}