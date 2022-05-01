import { QueueClient } from '../queue-drivers'
import { TaskReference } from '../../models'

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