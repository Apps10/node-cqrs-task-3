import { CompletedTaskCommandHandler } from "../modules/Task/application/handlers/CompletedTaskCommandHandler";
import { CreateTaskCommandHandler } from "../modules/Task/application/handlers/CreateTaskCommandHandler";
import { TaskWriteRepository } from "../modules/Task/domain/TaskWriteRepository";
import { InMemoryMessageBus } from "../shared/infraestructure/InMemoryMessageBus";
import { TaskInMemoryWriteDB } from "../modules/Task/infraestructure/TaskInMemoryWriteDB";
import { MessageBus } from "../shared/domain/MessageBus";
import { TaskCreatedEventHandler } from "../modules/Task/application/eventHandlers/TaskCreatedEventHandler";
import { TaskReadRepository } from "../modules/Task/domain/TaskReadRepository";
import { TaskInMemoryReadDB } from "../modules/Task/infraestructure/TaskInMemoryReadDB";
import { FindAllTaskQueryHandler } from "../modules/Task/application/handlers/FindAllTaskQueryHandler";
import { FindTaskByIdQueryHandler } from "../modules/Task/application/handlers/FindTaskByIdQueryHandler";
import { TaskCompletedEventHandler } from "../modules/Task/application/eventHandlers/TaskCompletedEventHandler";
import { ElasticSearchClient } from "../shared/infraestructure/ElasticClient";
import { SearchRepository } from "../shared/domain/SearchRepository";
import { ElasticSearchRepository } from "../shared/infraestructure/ElasticSearchRepository";
import { ILogger } from "../shared/domain/Logger";
import { winstonLogger, WinstonLoggerAdapter } from "../shared/infraestructure/WinstonLogger";
import { SentryClient } from "../shared/infraestructure/SentryClient";
import { PostgresClient } from "../shared/infraestructure/PostgresClient";
import { initTaskModel } from "../modules/Task/infraestructure/TaskWriteModel";
import { TaskPostgresWriteDB } from "../modules/Task/infraestructure/TaskPostgresWriteDB";
import { MongoDBClient } from "../shared/infraestructure/MongoClient";
import { TaskMongoReadRepository } from "../modules/Task/infraestructure/MongoTaskReadRepository";

export class Container {
  postgresClient: PostgresClient
  mongoDBClient: MongoDBClient
  taskWriteDB?: TaskWriteRepository;
  taskReadDB?: TaskReadRepository;
  messageBus: MessageBus;
  elasticSearch: SearchRepository;
  logger: ILogger;
  sentry: typeof SentryClient

  constructor() {
    this.logger = new WinstonLoggerAdapter(winstonLogger)
    this.sentry = SentryClient
    this.messageBus = new InMemoryMessageBus(this.logger, this.sentry!);
    this.postgresClient = new PostgresClient(this.logger, this.sentry!)
    this.mongoDBClient = new MongoDBClient(this.logger)
    this.elasticSearch = new ElasticSearchRepository(ElasticSearchClient())
  }

  async initialize() {
    await this.mongoDBClient.initialize()
    await this.postgresClient.initialize()

    // this.taskWriteDB = new TaskInMemoryWriteDB();
    this.taskWriteDB = new TaskPostgresWriteDB()
    // this.taskReadDB = new TaskMongoReadRepository(this.mongoDBClient)
    this.taskReadDB = new TaskMongoReadRepository(this.mongoDBClient)

    initTaskModel(this.postgresClient.dbClient)
    this.registerHandlers();
    this.registerEventHandler()
    this.registerQueryHandler()
  }

  private registerHandlers() { 
    this.messageBus.registerCommandHandler(
      "TaskCreateCommand",
      new CreateTaskCommandHandler(this.taskWriteDB!, this.messageBus),
    );

    this.messageBus.registerCommandHandler(
      "TaskCompleteCommand",
      new CompletedTaskCommandHandler(this.taskWriteDB!, this.messageBus),
    );
  }

  private registerEventHandler(){
    this.messageBus.registerEventHandler(
      'TaskCreatedEvent',
      [new TaskCreatedEventHandler(this.taskReadDB!, this.elasticSearch)]
    )

     this.messageBus.registerEventHandler(
      'TaskCompletedEvent',
      [new TaskCompletedEventHandler(this.taskReadDB!, this.elasticSearch)]
    )
  }

  private registerQueryHandler(){
    this.messageBus.registerQueryHandler(
      'FindAllTaskQuery',
      new FindAllTaskQueryHandler(this.taskReadDB!)
    )

     this.messageBus.registerQueryHandler(
      'FindTaskByIdQuery',
      new FindTaskByIdQueryHandler(this.taskReadDB!)
    )
  }
}
