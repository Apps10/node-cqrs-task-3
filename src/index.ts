import express from "express"
import { createTaskRoute } from "./api/routes/tasksRoute"
import { Container } from "./bootstrap/Container"
import { ErrorCatcherMiddleware } from "./shared/infraestructure/ErrorCatcherMiddleware"

const startServer = async () => {
  const PORT = 3000
  const app = express()

  const container = new Container()
  container.initialize()
  const logger = container.logger

  app.use(express.json())
  app.use('/task', createTaskRoute(container.messageBus, logger))
  app.use(ErrorCatcherMiddleware.catch)

  app.listen(PORT, ()=>{
    logger.info(`Server Running at Port`, PORT);
  })
}

startServer()
.catch((err)=>{
  console.error(err)
})