export const DomainError = (exceptionName: string, defaultMessageError: string, httpStatusError: number, )=>{
  return class extends BaseDomainError {
    constructor(message?: string){
      super(message ?? defaultMessageError, httpStatusError)
      this.name = exceptionName
    }
  }
} 


export abstract class BaseDomainError extends Error {
  httpStatus: number
  timestamp: Date

  constructor(message: string, httpStatus: number) {
    super(message)
    this.httpStatus = httpStatus
    this.timestamp = new Date()
  }
} 
