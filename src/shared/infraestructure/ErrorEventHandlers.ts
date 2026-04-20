import { ErrorMonitor } from "../domain/ErrorMonitor";
import { EventHandler } from "../domain/EventHandler";

export class ErrorEventHandler {
  event?: EventHandler<any> 
  constructor(private readonly monitor: ErrorMonitor){}

  handler(event:any) {
    try{
      if(!this.event) {
        return
      }
      this.event?.handle(event)
    }catch(err){
      this.monitor.captureException(err)
    }
  }

  setEventHandlers(eventHandler:any) {
    this.event = eventHandler
  }
}
