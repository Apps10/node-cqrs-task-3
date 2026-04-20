import { DomainEvent } from "./DomainEvent";

export interface EventHandler<TEvent extends DomainEvent> {
  handle(event: TEvent): Promise<void>
}