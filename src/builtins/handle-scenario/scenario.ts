import { QueueClient } from '../queue-drivers'
import { TaskReference } from '../../models'

export abstract class Scenario {
  readonly currentTaskResult: any
  readonly nextTaskRefs: TaskReference[]
  readonly queueClient: QueueClient

  constructor (
    currentTaskResult: unknown,
    nextTaskRefs: TaskReference[],
    queueClient: QueueClient
  ) {
    this.currentTaskResult = currentTaskResult
    this.nextTaskRefs = nextTaskRefs
    this.queueClient = queueClient
  }

  abstract evoke (): void
}

export interface ScenarioReference {
  evoke: () => void,

  new (
    currentTaskResult: unknown,
    nextTaskRefs: TaskReference[],
    queueClient: QueueClient
  ): Scenario
}