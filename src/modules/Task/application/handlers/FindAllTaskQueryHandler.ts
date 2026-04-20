import { QueryHandler } from "../../../../shared/domain/QueryHandler";
import { TaskReadModel } from "../../domain/TaskReadModel";
import { TaskReadRepository } from "../../domain/TaskReadRepository";
import { FindAllTaskQuery } from "../queries/FindAllTaskQuery";

export class FindAllTaskQueryHandler implements QueryHandler<FindAllTaskQuery, TaskReadModel[]>{
  constructor(
    private readonly taskRepository: TaskReadRepository
  ){}

  async handler(_: FindAllTaskQuery): Promise<TaskReadModel[]> {
    return await this.taskRepository.findAll();
  }
}