export class InternalError extends Error {
  constructor(exceptionName: string){
    super(exceptionName)
  }
} 
export class CommandHandlerNotSupportException extends InternalError {
  constructor(){
    super('CommandHandlerNotSupportException')
  }
}
export class QueryHandlerNotSupportException extends InternalError {
  constructor(){
    super('QueryHandlerNotSupportException')
  }
}
