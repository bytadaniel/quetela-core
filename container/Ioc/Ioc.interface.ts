export type Instance<T = unknown> = {
  name: string,
  singleton: boolean,
  getInstance: GetInstanceFunction<T>
}
  
export type GetInstanceFunction<T = unknown> = () => T