import { Ignitor } from '../Core/Ignitor'
import { RabbitProvider } from '../Providers/RabbitProvider'
import RootTask from '../Tasks/RootTask'

Ignitor({
  tasks: [RootTask],
  providers: [RabbitProvider]
})
