import { v4 } from "uuid";
import { Request, Response } from "express";
import { ITaskCompletedDTO, ITaskCreateDTO, ITaskFindByIdDTO } from "../dto/TaskDTO";
import { MessageBus } from "../../shared/domain/MessageBus";
import { TaskCreateCommand } from "../../modules/Task/application/commands/taskCreateCommand";
import { FindTaskByIdQuery } from "../../modules/Task/application/queries/FindTaskByIdQuery";
import { FindAllTaskQuery } from "../../modules/Task/application/queries/FindAllTaskQuery";
import { TaskCompleteCommand } from "../../modules/Task/application/commands/taskCompleteCommand";
import { ILogger } from "../../shared/domain/Logger";

export class TaskController {
  constructor(
    private readonly messageBus: MessageBus, 
    private readonly Logger: ILogger
  ){}

  async create(req:Request, res:Response) {
    const { description, title } = req.body as ITaskCreateDTO

    const taskId = v4() 
    const command = new TaskCreateCommand(v4(), taskId, title, description, false)
    await this.messageBus.executeCommand(command)
    res.status(201).json({message: 'Task Created Correctly'})
  }

  async findAll(req:Request, res:Response) {
    const query = new FindAllTaskQuery(v4())
    const tasks = await this.messageBus.executeQuery(query)
    res.status(200).json({tasks})
  }

  async findById(req:Request, res:Response) {
    const { taskId } = req.params as unknown as ITaskFindByIdDTO

    const query = new FindTaskByIdQuery(v4(), String(taskId))
    const task = await this.messageBus.executeQuery(query)
    res.status(200).json(task)
  }

  async completed(req:Request, res:Response) {
    const { taskId } = req.params as unknown as ITaskCompletedDTO

    const command = new TaskCompleteCommand(v4(), String(taskId))
    await this.messageBus.executeCommand(command)
    res.status(200).json({message: 'Task Completed Correctly'})
  }
}