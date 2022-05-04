# Quetela

Light queue based app framework for simple enterprise development

## Basic start

### Complex example
https://github.com/bytadaniel/quetela-examples
### Simple example
```javascript
  import container from './container'
import { NodeQueueClient } from './builtins/queue-drivers/base-driver'
import { Queue } from './models/Queue.model'
import { Task } from './models/Task.model'
import { ChainContext } from './builtins/context'
import { Ignitor } from './ignitor'

class BaseQueue extends Queue {
  public static queueName = 'base_queue'
}

class BaseTask1 extends Task {
  public static taskName = 'base_task_1'
  public static queue = BaseQueue
  public static async handler (payload: any) {
    return {
      name: BaseTask1.taskName,
      data: Math.floor(Math.random() * 1000)
    }
  }
}

class BaseTask2 extends Task {
  public static taskName = 'base_task_2'
  public static queue = BaseQueue
  public static async handler (payload: any) {
    return {
      name: BaseTask2.taskName,
      data: Math.floor(Math.random() * 1000)
    }
  }
}


async function main () {
  await Ignitor({
    queueClient: new NodeQueueClient(), // nodejs synchronous message broker (mock for tests)
    contexts: [new ChainContext([BaseTask1, BaseTask2])],
    providers: []
  })

  const queueClient = container.get<NodeQueueClient>('queueClient')

  queueClient.sendMessage(BaseQueue.queueName, {
    previousData: {},
    taskName: BaseTask1.taskName,
    attempt: 1,
    data: { hello: true }
  })
}

main()
```

### Use providers for third-party connections
```javascript
// providers/MongoProvider

import { Provider } from '@quetela/core'

const connection = new Promise(resolve => resolve({
  connected: true,
  logger: undefined
}))

export class MongoProvider extends Provider {
  register() {
    this.container.bind('mongo').to(connection)
  }

  async init() {
    const awaitedMongoConnection = await this.container.getAsync('mongo')
    this.container.rebind('mongo').to(awaitedMongoConnection)
  }

  async ready() {
    const mongoConnection = this.container.get('mongo')
    mongoConnection.logger = process.stderr
  }
}
```

### Create your custom contexts with abstract Context and scenario function
```javascript
  export abstract class TaskContext {
    abstract next (task: TaskReference): TaskNext
    abstract getTasks (): TaskReference[]
  }

  export interface TaskNext {
    tasks: TaskReference[],
    scenario: (...args: any[]) => void
  }
```

### Create your own queueClients with abstract QueueClient/QueueConnection/QueueDriver
```javascript
  export abstract class QueueClient {
    abstract disconnect (): void
    abstract assertQueue (name: string): void
    abstract sendMessage (queue: string, message: Message): void
    abstract consume (onConsumed: (message: Message) => Promise<void>): void
  }
```
