import { QueueClient } from '../queue-drivers'
import { TaskReference } from '../../models'

export function closureScenario (
  currentTaskResult: any,
  nextTaskRefs: TaskReference[],
  queueClient: QueueClient
) {
  const [nextTaskRef] = nextTaskRefs
  queueClient.sendMessage(nextTaskRef.queue.queueName, {
    taskName: nextTaskRef.taskName,
    attempt: 1,
    data: currentTaskResult
  })
}