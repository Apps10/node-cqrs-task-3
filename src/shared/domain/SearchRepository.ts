export interface SearchRepository {
  index(task: {
    id: string
    title: string
    description: string
    completed: boolean
  }): Promise<void>

  update(id: string, data: Partial<any>): Promise<void>
}