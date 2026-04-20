import { DomainEvent } from "../../../shared/domain/DomainEvent";

export enum TaskEvents {
  CREATED = "TaskCreated",
  COMPLETED = "TaskCompleted",
}

export interface ITask {
  id: string,
  title: string,
  description: string,
  completed: boolean,
}

export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public completed: boolean,
  ) {}

  isCompleted() {
    this.completed = true;
  }

  toJSON(): ITask {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed
    }
  }

  static create(task:{
    id: string,
    title: string,
    description: string,
    completed: boolean,
  }) {
    const {id, title, description, completed} = task
    return new Task(id, title, description, completed)
  }
}

export class TaskCreatedEvent extends DomainEvent {
  constructor(
    eventId: string, 
    taskId: string, 
    public readonly task: ITask
   ) {
    super(eventId, taskId, TaskEvents.CREATED);
  }
}

export class TaskCompletedEvent extends DomainEvent {
  constructor(
    eventId: string, 
    taskId: string,
    public readonly task: ITask
  ) {
    super(eventId, taskId, TaskEvents.COMPLETED);
  }
}
