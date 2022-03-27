import { QueueClientReference } from './../builtins/queue-drivers/QueueClient';
import container from '../container'
import { ProviderReference } from '../models'
import { TaskReference } from '../models'
import { onProviderInit, onProviderReady, onProviderRegister } from '../hooks'

export type IgnitorConfig = {
  queueClient: QueueClientReference
  tasks?: TaskReference[],
  providers?: ProviderReference[]
}

/**
 * Ignitor - это инициализатор приложения. Функция принимает ссылки на необходимые компоненты
 * после чего регистрирует все зависимости в Ioc контейнере и начинает прослушку задач
 */
export async function Ignitor ({
  queueClient: QueueClientRef,
  providers = [],
  tasks = []
}: IgnitorConfig): Promise<void> {
  const queueClient = new QueueClientRef()
  container.bindSingleton('queueClient', () => queueClient)


  const providerInstances = providers.map(Provider => new Provider(container))
  const taskInstances = tasks.map(Task => new Task())

  await onProviderRegister(providerInstances)
  await onProviderInit(providerInstances)  
  
  taskInstances.forEach(taskInstance => {
    // const queueInstance = new taskInstance.queue()
    // queueInstance.connection.assertQueue(queueInstance.queueName)
  })

  queueClient.consume(message => console.log(message))

  await onProviderReady(providerInstances)
}