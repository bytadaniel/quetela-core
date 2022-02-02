import { Provider } from '../../models/Provider.model';
/**
 * Регистрирующий провайдеры хук. Вызывается после инициализации инстансов каждого провайдера,
 * который был передан в Ingitor
 */
export declare function onProviderRegister(providers: Provider[]): Promise<void>;
