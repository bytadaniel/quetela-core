# Quetela

Light queue based app framework for simple enterprise development

## Basic start
### Initialize your own providers
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
### Initialize your own queues
```javascript
// queues/MainQueue.js

import { container, Queue } from '@quetela/core'

export class MainQueue extends Queue {
  queueName = 'main_queue'
  connection = container.get('rabbit')
}
```
### Initialize your own tasks and bind subtasks and queues to them
```javascript
// tasks/MainTask.js

import { Task } from '@quetela/core'
import { MainQueue } from '../queues/MainQueue.js'
import { MainChildTask } from './MainChildTask.js'

export class MainTask extends Task {
  taskName = 'main_task'

  children = [MainChildTask]

  queue = MainQueue

  async handler (payload) {
    console.log(payload)
    return { result: true }
  }

  async producer (result) {
    console.log(result)
    return { payload: true }
  }
}
```

```javascript
// tasks/MainChildTask.js

import { Task } from '@quetela/core'
import { MainQueue } from '../queues/MainQueue.js'

export class MainChildTask extends Task {
  taskName = 'main_child_task'

  children = []

  queue = MainQueue

  async handler (payload) {
    console.log(payload)
    return { result: true }
  }

  async producer (result) {
    console.log(result)
    return { payload: true }
  }
}
```
### Ingit a script with provided dependencies
```javascript
// scripts/MainScript.js

import { Ignitor, RabbitProvider } from '@quetela/core'
import { MongoProvider } from '../providers/MongoProvider.js'
import { MainChildTask } from '../tasks/MainChildTask.js'
import { MainTask } from '../tasks/MainTask.js'

Ignitor({
  providers: [
    RabbitProvider,
    MongoProvider
  ],
  tasks: [
    MainTask,
    MainChildTask  
  ]
})


```

### Run your script
`$ npm run scripts/MainScript.js`
