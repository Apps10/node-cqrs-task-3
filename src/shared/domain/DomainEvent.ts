export class DomainEvent {
  public readonly ocurredAt: Date
  constructor(
    public readonly eventId: string,
    public readonly aggregateId: string,
    public readonly eventType: string
  ){
    this.ocurredAt = new Date()
  }
}