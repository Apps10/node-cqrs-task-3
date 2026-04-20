import { DomainError } from "../../../shared/domain/DomainError";
export const TaskNotFoundException = DomainError('TaskNotFoundException', 'task not found', 404)
