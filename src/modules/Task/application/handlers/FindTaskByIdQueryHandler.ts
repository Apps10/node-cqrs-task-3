import { QueryHandler } from "../../../../shared/domain/QueryHandler";
import { TaskNotFoundException } from "../../domain/TaskError";
import { TaskReadModel } from "../../domain/TaskReadModel";
import { TaskReadRepository } from "../../domain/TaskReadRepository";
import { FindTaskByIdQuery } from "../queries/FindTaskByIdQuery";

export class FindTaskByIdQueryHandler implements QueryHandler<FindTaskByIdQuery, TaskReadModel>{
  constructor(
    private readonly taskRepository: TaskReadRepository,
  ){}

  async handler(query: FindTaskByIdQuery): Promise<TaskReadModel> {
    const task = await this.taskRepository.findById(query.taskId)
    if(!task) throw new TaskNotFoundException()
    
    return task
  }
}