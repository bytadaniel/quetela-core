import { container } from "../Container/container"
import { BaseProvider, ProviderReference } from "../BaseModel/BaseProvider"
import { TaskReference } from "../BaseModel/BaseTask"

export type BootstrapConfig = {
  tasks: TaskReference[],
  providers: ProviderReference[]
}

/**
 * Регистрирующий провайдеры хук. Вызывается после инициализации инстансов каждого провайдера,
 * который был передан в Ingitor
 */
async function useOnRegisterHook (providers: BaseProvider[]) {
  for (const provider of providers) {
    provider.register()
  }
}

/**
 * Асинхронный хук инициализации провайдера. Как правило, используется,
 * чтобы разрешить все промисы, приходящие из I/O
 */
async function useOnInitHook (providers: BaseProvider[]) {
  for (const provider of providers) {
    await provider.init()
  }
}

/**
 * Асинхронный хук, который может использоваться для любых действий после того,
 * как все компоненты системы инициализованы
 */
async function useOnReadyHook (providers: BaseProvider[]) {
  for (const provider of providers) {
    await provider.ready()
  }
}

/**
 * Ignitor - это инициализатор приложения. Функция принимает ссылки на необходимые компоненты
 * после чего регистрирует все зависимости в Ioc контейнере и начинает прослушку задач
 */
export async function Ignitor ({ providers, tasks }: BootstrapConfig): Promise<void> {
  const providerInstances = providers.map(Provider => new Provider(container))
  const taskInstances = tasks.map(Task => new Task())

  await useOnRegisterHook(providerInstances)
  await useOnInitHook(providerInstances)  
  
  taskInstances.forEach(({ queue: Queue }) => {
    const { connection, queueName } = new Queue()
    connection.assertQueue(queueName)
  })

  // TODO сделать подписку на задачи из реббита

  await useOnReadyHook(providerInstances)
}