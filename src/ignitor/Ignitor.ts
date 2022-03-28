import { Task, TaskReference } from './../models/Task.model';
import { GlobalContext } from '../builtins/context'
import container from '../container'
import { onProviderInit, onProviderReady, onProviderRegister } from '../hooks'
import { IgnitorConfig } from './Ignitor.interface';

/**
 * Ignitor - это инициализатор приложения. Функция принимает ссылки на необходимые компоненты
 * после чего регистрирует все зависимости в Ioc контейнере и начинает прослушку задач
 */
export async function Ignitor ({
  queueClient,
  providers = [],
  contexts = []
}: IgnitorConfig): Promise<void> {
  const globalContext = new GlobalContext()

  container.bindSingleton('queueClient', () => queueClient)
  container.bindSingleton('globalContext', () => globalContext)

  const providerInstances = providers.map(Provider => new Provider(container))

  for (const context of contexts) {
    globalContext.createContext(context)

    context.getTasks().forEach(TaskRef => {
      console.log(TaskRef.queue.queueName)
      console.log(TaskRef.taskName)
      queueClient.assertQueue(TaskRef.queue.queueName)
      container.rebindSingleton(TaskRef.taskName, () => TaskRef)
      container.rebindSingleton(TaskRef.queue.queueName, () => TaskRef.queue)
    })
  }

  await onProviderRegister(providerInstances)
  await onProviderInit(providerInstances)

  // этот код вынести ближе к коду queueClient
  queueClient.consume(async message => {
    console.log('got message', message)
    const TaskRef = container.get<TaskReference>(message.taskName)

    const taskContexts = globalContext.getTaskContexts(TaskRef.taskName)
    console.log('task contexts', { taskContexts })

    const taskResult = await TaskRef.handler(message.previousData, message.data)
    console.log('task result', taskResult)


    for (const context of taskContexts) {
      const { scenario: evokeTaskScenario, tasks: nextTasks } = context.next(TaskRef)
      console.log('task context next tasks', { task: TaskRef, context, nextTasks })
      if (nextTasks.length) {
        evokeTaskScenario(taskResult, message.previousData, nextTasks, queueClient)
      }
      // for (const { taskName } of nextTasks) {
      //   queueClient.sendMessage(TaskRef.queue.queueName, { taskName, attempt: 1, data: taskResult })
      // }
    }

    // console.log('queueClient', queueClient)
  })

  await onProviderReady(providerInstances)
}