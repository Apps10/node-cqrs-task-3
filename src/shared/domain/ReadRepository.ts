
export interface ReadRepository<Interface> {
  findAll(): Promise<Interface[]>
  findById(id: string): Promise<Interface | null>
  save(data: Interface): Promise<void>
}