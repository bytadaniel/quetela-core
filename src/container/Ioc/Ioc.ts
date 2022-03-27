import { Instance, GetInstanceFunction } from "./Ioc.interface"

export class Ioc {
  readonly instances: Record<string, Instance>
  constructor () {
    this.instances = {}
  }

  private bindInstance<T> (name: string, getInstance: GetInstanceFunction<T>, singleton: boolean, safe: boolean = false) {
    const exists = Boolean(this.instances[name])
    if (exists && safe) throw new Error(`Instance ${name} already exists`)
    this.instances[name] = { name, getInstance, singleton }
  }

  public bind<T> (name: string, instanceCb: GetInstanceFunction<T>) {
    this.bindInstance<T>(name, instanceCb, false, true)
  }

  public rebind <T>(name: string, instanceCb: GetInstanceFunction<T>) {
    this.bindInstance<T>(name, instanceCb, false, false)
  }

  public bindSingleton <T>(name: string, instanceCb: GetInstanceFunction<T>) {
    const instance = instanceCb()
    this.bindInstance<T>(name, () => instance, true, true)
  }

  public rebindSingleton <T>(name: string, instanceCb: GetInstanceFunction<T>) {
    const instance = instanceCb()
    this.bindInstance<T>(name, () => instance, true, false)
  }

  public get<T> (name: string) {
    const exists = Boolean(this.instances[name])
    if (!exists) throw new Error(`Instance ${name} does not exist`)
    return this.instances[name].getInstance() as T
  }

  public async getAsync <T>(name: string, doAsync: (instance: T) => Promise<void>) {
    const exists = Boolean(this.instances[name])
    if (!exists) throw new Error(`Instance ${name} does not exist`)

    const instance = this.instances[name].getInstance() as T
    await doAsync(instance)
    return instance
  }
}