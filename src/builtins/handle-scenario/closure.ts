import { QueueClient } from '../queue-drivers'
import { TaskReference } from '../../models'

export function closureScenario (
  currentTaskResult: any,
  previousTaskResults: Record<string, any>,
  nextTaskRefs: TaskReference[],
  queueClient: QueueClient
) {
  const [nextTaskRef] = nextTaskRefs
  queueClient.sendMessage(nextTaskRef.queue.queueName, {
    previousData: Object.assign(previousTaskResults, currentTaskResult),
    taskName: nextTaskRef.taskName,
    attempt: 1,
    data: currentTaskResult
  })
}