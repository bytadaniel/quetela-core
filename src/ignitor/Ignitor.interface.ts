import { ProviderReference } from '../models/Provider.model';
import { QueueClientReference, QueueClient } from '../builtins/queue-drivers/QueueClient';
import { TaskContext } from '../builtins/context';

export type IgnitorConfig = {
  queueClient: QueueClient
  contexts?: TaskContext[]
  providers?: ProviderReference[]
}