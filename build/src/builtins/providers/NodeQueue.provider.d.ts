import { Provider } from '../../models';
export declare class NodeQueueProvider extends Provider {
    register(): void;
    init(): Promise<void>;
    ready(): Promise<void>;
}
