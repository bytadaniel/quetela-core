import { ProviderReference } from '../models/Provider.model';
import { QueueClientReference } from '../builtins/queue-drivers/QueueClient';
import { TaskContext } from '../builtins/context';

export type IgnitorConfig = {
  queueClient: QueueClientReference
  contexts?: TaskContext[]
  providers?: ProviderReference[]
}