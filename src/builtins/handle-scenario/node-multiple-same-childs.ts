import { QueueClient } from '../queue-drivers'
import { TaskReference } from '../../models'

/**
 * Сценарий разветвления ветви задачи, при которой от одной родительской задачи
 * создается столько одинаковых подзадач-ответвлений, сколько объектов в массиве вернула родительская задача
 */
export function nodeMultipleSameChildsScenario (
  currentTaskResult: any[],
  previousTaskResults: Record<string, any>,
  nextTaskRefs: TaskReference[],
  queueClient: QueueClient
) {
  const [nextTaskRef] = nextTaskRefs
  currentTaskResult.map(data => queueClient.sendMessage(nextTaskRef.queue.queueName, {
    previousData: Object.assign(previousTaskResults, data),
    taskName: nextTaskRef.taskName,
    attempt: 1,
    data
  }))
}