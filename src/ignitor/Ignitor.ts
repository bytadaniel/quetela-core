import { Task } from './../models/Task.model';
import { GlobalContext } from '../builtins/context'
import container from '../container'
import { onProviderInit, onProviderReady, onProviderRegister } from '../hooks'
import { IgnitorConfig } from './Ignitor.interface';

/**
 * Ignitor - это инициализатор приложения. Функция принимает ссылки на необходимые компоненты
 * после чего регистрирует все зависимости в Ioc контейнере и начинает прослушку задач
 */
export async function Ignitor ({
  queueClient: QueueClientRef,
  providers = [],
  contexts = []
}: IgnitorConfig): Promise<void> {
  const queueClient = new QueueClientRef()
  const globalContext = new GlobalContext()

  container.bindSingleton('queueClient', () => queueClient)
  container.bindSingleton('globalContext', () => globalContext)

  const providerInstances = providers.map(Provider => new Provider(container))

  for (const context of contexts) {
    globalContext.createContext(context)

    context.getTasks().forEach(task => {
      queueClient.assertQueue(task.queue.queueName)
      container.rebindSingleton(task.taskName, () => task)
      container.rebindSingleton(task.queue.queueName, () => task.queue)
    })
  }



  await onProviderRegister(providerInstances)
  await onProviderInit(providerInstances)  

  // этот код вынести ближе к коду queueClient
  queueClient.consume(async message => {
    console.log('got message', message)

    const task = container.get<typeof Task>(message.taskName)
    console.log('message task', Task)

    const taskContexts = globalContext.getTaskContexts(task.taskName)
    console.log('task contexts', { taskContexts })

    const taskResult = await task.handler(message.data)
    console.log('task result', taskResult)

    for (const context of taskContexts) {
      const nextTasks = context.next(task)
      console.log('task context next tasks', { task, context, nextTasks })
      for (const { taskName } of nextTasks) {
        queueClient.sendMessage(task.queue.queueName, { taskName, attempt: 1, data: taskResult })
      }
    }

    console.log('queueClient', queueClient)
  })

  await onProviderReady(providerInstances)
}