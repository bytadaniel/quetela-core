```javascript
import container from '@quetela/core/build/container'
import { NodeQueueClient } from '@quetela/core/build/builtins/queue-drivers/base-driver'
import { Queue, Task } from '@quetela/core/build/models'
import { ChainContext } from '@quetela/core/build/builtins/context'
import { Ignitor } from '@quetela/core/build/ignitor'

class BaseQueue extends Queue {
  public static queueName = 'base_queue'
}

class InitialTask extends Task {
  public static taskName = 'initial_task'
  public static queue = BaseQueue
  public static async handler (ctx: any, payload: any) {
    console.log('Hello from initital task')
    return {}
  }
}

class BaseTask1 extends Task {
  public static taskName = 'base_task_1'
  public static queue = BaseQueue
  public static async handler (ctx: any, payload: any) {
    console.log('Hello from the first task')
    return {}
  }
}

class BaseTask2 extends Task {
  public static taskName = 'base_task_2'
  public static queue = BaseQueue
  public static async handler (ctx: any, payload: any) {
    console.log('Hello from the second task')
    return {}
  }
}


async function main () {
  await Ignitor({
    queueClient: new NodeQueueClient(), // nodejs synchronous message broker (mock for tests)
    contexts: [new ChainContext([InitialTask, BaseTask1, BaseTask2])],
    providers: []
  })

  const queueClient = container.get<NodeQueueClient>('queueClient')

  queueClient.sendMessage(BaseQueue.queueName, {
    previousData: {},
    taskName: BaseTask1.taskName,
    attempt: 1,
    data: {}
  })
}

main()
// Hello from initial task
// Hello from the first task
// Hello from the second task
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
    this.container.bind<MongoConnection>('mongo', () => connection)
  }

  async init() {
    const awaitedMongoConnection = await this.container.getAsync<MongoConnectionAuthenticated>('mongo', async (connection) => await connection.getAuthenticated())
    this.container.rebind<MongoConnectionAuthenticated>('mongo', () => awaitedMongoConnection)
  }

  async ready() {
    const mongoConnection = this.container.get<MongoConnectionAuthenticated>('mongo')
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
