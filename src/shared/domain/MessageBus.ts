import { Command } from "./Command";
import { CommandHandler } from "./CommandHandler";
import { DomainEvent } from "./DomainEvent";
import { ErrorMonitor } from "./ErrorMonitor";
import { EventHandler } from "./EventHandler";
import { ILogger } from "./Logger";
import { Query } from "./Query";
import { QueryHandler } from "./QueryHandler";

export abstract class MessageBus {
  constructor( 
    protected readonly logger:ILogger, 
    protected readonly errorMonitor: ErrorMonitor) 
  {}

  abstract publishEvent(event: DomainEvent): Promise<void> 
  abstract publishEventAsync(event: DomainEvent): void 
  abstract executeCommand<TCommand extends Command>(command: TCommand): Promise<void> 
  abstract executeQuery<TQuery extends Query, TResponse>(query: TQuery): Promise<TResponse> 
  abstract registerCommandHandler<TCommand extends Command>(name: string, commandhandler: CommandHandler<TCommand>): void
  abstract registerQueryHandler<TQuery extends Query, TResponse>(name: string, queryHandler: QueryHandler<TQuery, TResponse>): void
  abstract registerEventHandler<TQuery extends Query, TResponse>(name: string, eventHandlers: EventHandler<any>[]): void
}