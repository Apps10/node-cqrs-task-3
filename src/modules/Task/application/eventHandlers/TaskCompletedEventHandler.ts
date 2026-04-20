import { EventHandler } from "../../../../shared/domain/EventHandler";
import { SearchRepository } from "../../../../shared/domain/SearchRepository";
import { TaskCompletedEvent } from "../../domain/Task";
import { TaskReadRepository } from "../../domain/TaskReadRepository";

export class TaskCompletedEventHandler implements EventHandler<TaskCompletedEvent> {
  constructor(
    private readonly taskReadRepository: TaskReadRepository,
    private readonly elasticSearch: SearchRepository
  ){}

  async handle(event: TaskCompletedEvent): Promise<void> {
    const { task } = event
    const taskFromDB = await this.taskReadRepository.findById(task.id)
    if(!taskFromDB) {
      console.error(`consistencia eventual taskId ${task.id} not found`) 
      return
    }
  }
}