export class Query {
  public readonly timestamp: Date

  constructor(
    public readonly queryId: string,
  ){
    this.timestamp=new Date()
  }
}