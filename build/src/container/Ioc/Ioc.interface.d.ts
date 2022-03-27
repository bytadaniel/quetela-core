export declare type Instance<T = unknown> = {
    name: string;
    singleton: boolean;
    getInstance: GetInstanceFunction<T>;
};
export declare type GetInstanceFunction<T = unknown> = () => T;
