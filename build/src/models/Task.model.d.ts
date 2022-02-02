import { QueueReference } from './Queue.model';
/**
 * Абстрактный класс для любого провайдера в приложении
 * @TaskPayload - котекст текущей задачи
 * @TaskResult - результат обработчика родительской задачи
 */
export declare abstract class Task<TaskPayload = unknown, TaskResult = unknown> {
    /**
     * Название задачи, которое будет циркулировать внутри очереди задач
     */
    abstract readonly taskName: string;
    /**
     * Здесь мы объявляем массив ссылок на задачи, которые будет порождать текущая задача
     */
    abstract readonly children: TaskReference[];
    /**
     * Сылка на очередь задач, с которой будет работать текущая задача
     */
    abstract readonly queue: QueueReference;
    /**
     * Обработчик задачи
     * Когда очередь получает текущую задачу, она вызывает обработчик этой задачи
     * В обработчике выполняется основная логика задачи
     * Обработчик обязан вернуть какой-то результат для своих потомков
     */
    abstract handler(payload: TaskPayload): Promise<TaskResult>;
    /**
     * Если задача является чьим-то потомком, то она получает на вход результат выполнения обработчика предка,
     * чтобы породить в очередь задач задачу для будущей обработки
     */
    abstract producer(result: TaskResult): Promise<TaskPayload>;
}
export interface TaskReference {
    new (): Task;
}
