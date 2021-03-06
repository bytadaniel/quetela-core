import { QueueClient } from '../queue-drivers'
import { TaskReference } from '../../models'

/**
 * Сценарий разветвления ветви задачи, при которой от одной родительской задачи
 * создается предопределенное количество различных подзадач
 */
export function nodeMultipleSameChildsScenario (
  currentTaskResult: any,
  previousTaskResults: Record<string, any>,
  nextTaskRefs: TaskReference[],
  queueClient: QueueClient
) {
  for (const nextTaskRef of nextTaskRefs) {
    queueClient.sendMessage(nextTaskRef.queue.queueName, {
      previousData: Object.assign(previousTaskResults, currentTaskResult),
      taskName: nextTaskRef.taskName,
      attempt: 1,
      data: currentTaskResult
    })
  }
}