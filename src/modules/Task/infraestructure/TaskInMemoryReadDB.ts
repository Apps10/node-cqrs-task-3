import { Task } from "../domain/Task";
import { TaskReadModel } from "../domain/TaskReadModel";
import { TaskReadRepository } from "../domain/TaskReadRepository";

export class TaskInMemoryReadDB implements TaskReadRepository {
  task = new Map<string, TaskReadModel>();

  findById(taskId: string): Promise<Task | null> {
    const taskFromDB = this.task.get(taskId);
    if (!taskFromDB) return Promise.resolve(null);

    const taskInstance = Task.create(taskFromDB);
    return Promise.resolve(taskInstance);
  }

  save(task: Task): Promise<void> {
    this.task.set(task.id, task);
    return Promise.resolve();
  }

  findAll(): Promise<TaskReadModel[]> {
    const tasks:TaskReadModel[] = []
    this.task.forEach((t)=>tasks.push(t))
    return Promise.resolve(tasks)
  }
}
