import { Instance, GetInstanceFunction } from "./Ioc.interface";
export declare class Ioc {
    readonly instances: Record<string, Instance>;
    constructor();
    private bindInstance;
    bind<T>(name: string, instanceCb: GetInstanceFunction<T>): void;
    rebind<T>(name: string, instanceCb: GetInstanceFunction<T>): void;
    bindSingleton<T>(name: string, instanceCb: GetInstanceFunction<T>): void;
    rebindSingleton<T>(name: string, instanceCb: GetInstanceFunction<T>): void;
    get<T>(name: string): T;
    getAsync<T>(name: string, doAsync: (instance: T) => Promise<void>): Promise<T>;
}
