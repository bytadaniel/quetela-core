import { Provider } from '../../models/Provider.model'

/**
 * Асинхронный хук инициализации провайдера. Как правило, используется,
 * чтобы разрешить все промисы, приходящие из I/O
 */
export async function onProviderInit (providers: Provider[]) {
  for (const provider of providers) {
    await provider.init()
  }
}