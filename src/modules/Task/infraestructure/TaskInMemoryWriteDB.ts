import { WriteRepository } from "../../../shared/domain/WriteRepository";
import { ITask, Task } from "../domain/Task";

export class TaskInMemoryWriteDB implements WriteRepository<Task> {
  task = new Map<string, ITask>();

  findById(taskId: string): Promise<Task | null> {
    const taskFromDB = this.task.get(taskId);
    if (!taskFromDB) return Promise.resolve(null);

    const taskInstance = Task.create(taskFromDB);
    return Promise.resolve(taskInstance);
  }

  save(task: Task): Promise<void> {
    this.task.set(task.id, task.toJSON());
    return Promise.resolve();
  }
}
