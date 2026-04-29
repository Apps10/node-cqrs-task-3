import { Task } from "../domain/Task";
import { TaskWriteRepository } from "../domain/TaskWriteRepository";
import { TaskModel } from "./TaskWriteModel";

export class TaskPostgresWriteDB implements TaskWriteRepository {
  constructor(){}

  async findById(id: string): Promise<Task | null> {
    const taskFromDB = await TaskModel.findByPk(id)
    if(!taskFromDB) return null

    return Task.create(taskFromDB.toJSON())
  }

  async save(instance: Task): Promise<void> {
    const taskFromDB = await this.findById(instance.id)
    if(taskFromDB) {
      await TaskModel.update(taskFromDB, {where: {id: taskFromDB.id}})
      return
    }
    await TaskModel.create({...instance.toJSON()})
  }
}