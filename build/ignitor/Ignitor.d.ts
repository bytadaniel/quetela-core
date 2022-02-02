import { ProviderReference } from '../models';
import { TaskReference } from '../models';
export declare type IgnitorConfig = {
    tasks: TaskReference[];
    providers: ProviderReference[];
};
/**
 * Ignitor - это инициализатор приложения. Функция принимает ссылки на необходимые компоненты
 * после чего регистрирует все зависимости в Ioc контейнере и начинает прослушку задач
 */
export declare function Ignitor({ providers, tasks }: IgnitorConfig): Promise<void>;
//# sourceMappingURL=Ignitor.d.ts.map