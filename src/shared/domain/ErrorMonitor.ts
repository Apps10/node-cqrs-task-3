export interface ErrorMonitor {
  captureException(...metadata:any): void
} 