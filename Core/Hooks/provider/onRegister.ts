import { BaseProvider } from '../../BaseModel/BaseProvider'

/**
 * Регистрирующий провайдеры хук. Вызывается после инициализации инстансов каждого провайдера,
 * который был передан в Ingitor
 */
export async function onProviderRegister (providers: BaseProvider[]) {
  for (const provider of providers) {
    provider.register()
  }
}
