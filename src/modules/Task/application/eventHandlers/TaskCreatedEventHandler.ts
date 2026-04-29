import { EventHandler } from "../../../../shared/domain/EventHandler";
import { TaskCreatedEvent } from "../../domain/Task";
import { TaskReadRepository } from "../../domain/TaskReadRepository";
import { SearchRepository } from "../../../../shared/domain/SearchRepository";

export class TaskCreatedEventHandler implements EventHandler<TaskCreatedEvent> {
  constructor(
    private readonly taskReadRepository: TaskReadRepository,
    private readonly elasticSearch: SearchRepository
  ){}

  async handle(event: TaskCreatedEvent): Promise<void> {
    const { task } = event

    await this.taskReadRepository.save(task)
    await this.elasticSearch.index(task)
  }
}