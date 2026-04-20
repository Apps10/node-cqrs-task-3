export interface ITaskCreateDTO {
  title: string,
  description: string
}

export interface ITaskUpdateAsCompletedDTO {
  taskId: string,
}

export interface ITaskFindByIdDTO {
  taskId: string,
}

export interface ITaskCompletedDTO {
  taskId: string,
}