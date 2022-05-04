import { Provider } from '../../models/Provider.model'

/**
 * Регистрирующий провайдеры хук. Вызывается после инициализации инстансов каждого провайдера,
 * который был передан в Ignitor
 */
export async function onProviderRegister (providers: Provider[]) {
  for (const provider of providers) {
    provider.register()
  }
}
