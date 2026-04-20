export class Command {
  public readonly timestamp: Date

  constructor(
    public readonly commandId: string,
  ){
    this.timestamp=new Date()
  }
}