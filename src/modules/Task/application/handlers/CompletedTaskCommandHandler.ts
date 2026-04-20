import { v4 } from "uuid";
import { CommandHandler } from "../../../../shared/domain/CommandHandler";
import { MessageBus } from "../../../../shared/domain/MessageBus";
import { TaskCompletedEvent } from "../../domain/Task";
import { TaskNotFoundException } from "../../domain/TaskError";
import { TaskWriteRepository } from "../../domain/TaskWriteRepository";
import { TaskCompleteCommand } from "../commands/taskCompleteCommand";

export class CompletedTaskCommandHandler implements CommandHandler<TaskCompleteCommand> {
  constructor(
    private readonly taskRepository: TaskWriteRepository,
    private readonly messageBus: MessageBus
  ){}
  
  async handler(command: TaskCompleteCommand): Promise<void> {
    const task = await this.taskRepository.findById(command.taskId)

    if(!task) throw new TaskNotFoundException()
    if(task.completed == true) return
    task.isCompleted()

    await this.taskRepository.save(task)

    const event = new TaskCompletedEvent(v4(), task.id, task)
    this.messageBus.publishEventAsync(event)
  }
}