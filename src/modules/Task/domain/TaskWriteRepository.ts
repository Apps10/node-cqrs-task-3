import { WriteRepository } from "../../../shared/domain/WriteRepository";
import { Task } from "./Task";

export interface TaskWriteRepository extends WriteRepository<Task> {
}