import { Query } from "../domain/Query";
import { Command } from "../domain/Command";
import { CommandHandler } from "../domain/CommandHandler";
import { DomainEvent } from "../domain/DomainEvent";
import { EventHandler } from "../domain/EventHandler";
import { MessageBus } from "../domain/MessageBus";
import { QueryHandler } from "../domain/QueryHandler";
import { CommandHandlerNotSupportException, QueryHandlerNotSupportException } from "../domain/InternalError";
import { ILogger } from "../domain/Logger";
import { ErrorMonitor } from "../domain/ErrorMonitor";

export class InMemoryMessageBus extends MessageBus {
  commandHandlers = new Map<string, CommandHandler<any>>()
  queryHandlers = new Map<string, QueryHandler<any,any>>()
  eventHandlers = new Map<string, EventHandler<any>[]>()
  eventQueue: DomainEvent[] = []
  isProcessing = false

  constructor(
    protected readonly logger:ILogger, 
    protected readonly errorMonitor: ErrorMonitor
  ) {
    super(logger, errorMonitor)
  }

  async publishEvent(event: DomainEvent): Promise<void> {
    const eventName = event.constructor.name
    const eventHandler = this.eventHandlers.get(eventName) || []
    const promisesArray = eventHandler.map(eh=>eh.handle(event))
    this.logger.info(eventName, event)
    Promise.resolve(promisesArray)
  }

  publishEventAsync(event: DomainEvent): void {
    this.eventQueue.push(event)
    this.processEventQueue()
  }

  registerCommandHandler<TCommand extends Command>(name: string, commandhandler: CommandHandler<TCommand>): void {
    this.commandHandlers.set(name, commandhandler)
  }

  registerQueryHandler<TQuery extends Query, TResponse>(name: string, queryHandler: QueryHandler<TQuery, TResponse>): void {
    this.queryHandlers.set(name, queryHandler)
  }
  
  registerEventHandler<TQuery extends Query, TResponse>(name: string, eventHandlers: EventHandler<any>[]): void {
    this.eventHandlers.set(name, eventHandlers)
  }

  private processEventQueue(){
    if(this.isProcessing) return
    this.isProcessing = true 

    setImmediate(async ()=>{
      while(this.eventQueue.length > 0){
        const event = this.eventQueue.shift()
        try{
          if(event){
            await this.publishEvent(event)
            this.logger.debug(`Event Id: ${event.eventId} Processed Correctly`, {event})
          }
        }catch(err){
           this.logger.error(`Error Processing Event Id: ${event?.eventId}`, err)
           this.errorMonitor.captureException(err,{event})
        }finally {
          this.isProcessing = false
        }
      }
    })
  }


  async executeCommand<TCommand extends Command>(command: TCommand): Promise<void> {
    const commandName = command.constructor.name

    const commandHandler = this.commandHandlers.get(commandName)
    if(!commandHandler) throw new CommandHandlerNotSupportException()
    this.logger.debug(commandName, command)
    
    await commandHandler.handler(command)
  }

  async executeQuery<TQuery extends Query, TResponse>(query: TQuery): Promise<TResponse> {
    const queryName = query.constructor.name

    const queryHandler = this.queryHandlers.get(queryName)
    if(!queryHandler) throw new QueryHandlerNotSupportException()
    this.logger.debug(queryName, query)

    return await queryHandler.handler(query)
  }
}