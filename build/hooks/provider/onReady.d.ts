import { Provider } from '../../models/Provider.model';
/**
 * Асинхронный хук, который может использоваться для любых действий после того,
 * как все компоненты системы инициализованы
 */
export declare function onProviderReady(providers: Provider[]): Promise<void>;
