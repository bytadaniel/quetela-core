import { QueueClient } from '../queue-drivers'
import { TaskReference } from '../../models'

export function nodeMultipleSameChildsScenario (
  currentTaskResult: any,
  nextTaskRefs: TaskReference[],
  queueClient: QueueClient
) {
  for (const nextTaskRef of nextTaskRefs) {
    queueClient.sendMessage(nextTaskRef.queue.queueName, {
      taskName: nextTaskRef.taskName,
      attempt: 1,
      data: currentTaskResult
    })
  }
}