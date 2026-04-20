import { ReadRepository } from "../../../shared/domain/ReadRepository";
import { TaskReadModel } from "./TaskReadModel";

export interface TaskReadRepository extends ReadRepository<TaskReadModel> {}