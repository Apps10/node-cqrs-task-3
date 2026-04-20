export interface WriteRepository<Instance> {
  findById(id: string): Promise<Instance | null>
  save(instance: Instance): Promise<void>
}