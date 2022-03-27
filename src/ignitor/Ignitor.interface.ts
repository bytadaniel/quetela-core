import { ProviderReference } from '../models/Provider.model';
import { TaskReference } from '../models/Task.model'
import { QueueClientReference } from '../builtins/queue-drivers/QueueClient';

export type IgnitorConfig = {
  queueClient: QueueClientReference
  tasks?: TaskReference[],
  providers?: ProviderReference[]
}