import { v4 } from "uuid";
import { Task, TaskCreatedEvent } from "../../domain/Task";
import { CommandHandler } from "../../../../shared/domain/CommandHandler";
import { TaskWriteRepository } from "../../domain/TaskWriteRepository";
import { TaskCreateCommand } from "../commands/taskCreateCommand";
import { MessageBus } from "../../../../shared/domain/MessageBus";

export class CreateTaskCommandHandler implements CommandHandler<TaskCreateCommand> {
  constructor(
    private readonly taskRepository: TaskWriteRepository,
    private readonly messageBus: MessageBus
  ){}

  async handler(command: TaskCreateCommand): Promise<void> {
    const { completed, description, taskId, title } = command
    
    const newTask = Task.create({id: taskId, title, description, completed})
    await this.taskRepository.save(newTask)
    const event = new TaskCreatedEvent(v4(), newTask.id, newTask)
    this.messageBus.publishEventAsync(event)
  }
}