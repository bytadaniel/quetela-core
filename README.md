<p align="center">
  <a href="#" target="blank"><img src="https://ik.imagekit.io/py1g6jiey/28232522_Ec1LrfcPL.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1651898829640" width="300" alt="Quetela Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> package for building efficient and scalable server-side distributed queues with difficult relationships</p>

## Description

Quetela is a pure flexible package which gives to developers clear and confident way to design distributed systems. It uses modern JavaScript, is built with  <a href="http://www.typescriptlang.org" target="_blank">TypeScript</a> (preserves compatibility with pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming). Also, every part of Quetela is expandable.

## Philosophy

<p>Quetela is striving to abstract message brokers under interface and make all work with them on its own side. The only thing developer should do is to release how the intended entities will relate to each other.</p>
<p>Every part of Quetela represents an abstract class. So, therefore it is interchangeable and extendable. For example, you may use one of prebuild quene cliens or create your custom broker client</p>

## Concepts
#### How it works?
![@quetela/core concepts](https://ik.imagekit.io/py1g6jiey/quetela_architecture_geMEaJWVC.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651707816431 "@quetela/core concepts")

#### It's really easy to configure difficult relations between tasks 
![@quetela/core quetela_sample](https://ik.imagekit.io/py1g6jiey/sample_task_hierarchy_hDZ7FOywo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651709274019 "@quetela/core quetela_sample")
#### Contexts
##### Chain context
![@quetela/core chain_context](https://ik.imagekit.io/py1g6jiey/chain_context_RtpJNDbx1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651708529227 "@quetela/core chain_context")
##### Closure context
![@quetela/core closure_context](https://ik.imagekit.io/py1g6jiey/closure_context_kmzrrjExZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651708528961 "@quetela/core closure_context")
##### Node context
![@quetela/core node_context](https://ik.imagekit.io/py1g6jiey/node_context_BB-a7Y1W6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651708528724 "@quetela/core node_context")

##### Node multiple same context
![@quetela/core node_multiple_same_context](https://ik.imagekit.io/py1g6jiey/node_multiple_same_context_Z2xr6p3o9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651708528544 "@quetela/core node_multiple_same_context")

##### Global context (system feature)
![@quetela/core global_context](https://ik.imagekit.io/py1g6jiey/global_context_Jg5JlOr-n.png?ik-sdk-version=javascript-1.4.3&updatedAt=1651708528480 "@quetela/core global_context")

### Code example
https://github.com/bytadaniel/quetela-examples
### Simple example
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
