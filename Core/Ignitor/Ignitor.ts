import { container } from '../Container/container'
import { ProviderReference } from '../BaseModel/BaseProvider'
import { TaskReference } from '../BaseModel/BaseTask'
import { onProviderInit, onProviderReady, onProviderRegister } from '../Hooks'

export type BootstrapConfig = {
  tasks: TaskReference[],
  providers: ProviderReference[]
}

/**
 * Ignitor - это инициализатор приложения. Функция принимает ссылки на необходимые компоненты
 * после чего регистрирует все зависимости в Ioc контейнере и начинает прослушку задач
 */
export async function Ignitor ({ providers, tasks }: BootstrapConfig): Promise<void> {
  const providerInstances = providers.map(Provider => new Provider(container))
  const taskInstances = tasks.map(Task => new Task())

  await onProviderRegister(providerInstances)
  await onProviderInit(providerInstances)  
  
  taskInstances.forEach(taskInstance => {
    const queueInstance = new taskInstance.queue()
    queueInstance.connection.assertQueue(queueInstance.queueName)
  })

  // TODO сделать подписку на задачи из реббита

  await onProviderReady(providerInstances)
}