export interface Message<T = any> {
  previousData: Record<string, any>,
  taskName: string,
  attempt: number,
  data: T
}