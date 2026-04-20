import { Router } from "express"
import { TaskController } from "../controllers/taskController"
import { MessageBus } from "../../shared/domain/MessageBus"
import { ErrorHandler } from "../../shared/infraestructure/ErrorHandler"
import { ILogger } from "../../shared/domain/Logger"

export const createTaskRoute = (messageBus: MessageBus, logger: ILogger) => {
  const route = Router()
  const taskController = new TaskController(messageBus, logger)
 
  route.post('/', ErrorHandler(taskController.create.bind(taskController)))
  route.patch('/completed/:taskId', ErrorHandler(taskController.completed.bind(taskController)))
  route.get('/', ErrorHandler(taskController.findAll.bind(taskController)))
  route.get('/:taskId', ErrorHandler(taskController.findById.bind(taskController)))

  
  console.log('TaskRoute loaded');
  return route
}