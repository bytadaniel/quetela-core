import { Ignitor } from '../Core/Ignitor'
import { RabbitProvider } from '../Providers/RabbitProvider'
import { ClickhouseProvider } from '../Providers/ClickhouseProvider'
import RootTask from '../Tasks/RootTask'

Ignitor({
  tasks: [RootTask],
  providers: [RabbitProvider, ClickhouseProvider]
})