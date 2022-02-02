import { Provider } from '../../models';
export declare class RabbitProvider extends Provider {
    register(): void;
    init(): Promise<void>;
    ready(): Promise<void>;
}