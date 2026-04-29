import { Collection } from "mongodb";
import { TaskReadRepository } from "../domain/TaskReadRepository";
import { TaskReadModel } from "../domain/TaskReadModel";
import { Task } from "../domain/Task";
import { MongoDBClient } from "../../../shared/infraestructure/MongoClient";

export class TaskMongoReadRepository implements TaskReadRepository {
  
  private readonly collection: Collection<TaskReadModel>
  
  constructor(
    private readDatabase: MongoDBClient, 
  ){
    this.collection = this.readDatabase.getCollection<TaskReadModel>('tasks') 
  }

  async findById(id: string): Promise<TaskReadModel | null> {
    const user = await this.collection.findOne({id})
    return user
  }

  async findAll(): Promise<TaskReadModel[]> {
    const result = await this.collection.find({})
    return await result.toArray()
  }


  async save(task: Task): Promise<void> {
    const userExist = await this.findById(task.id)
    if(userExist) {
      await this.collection.updateOne(
        {id: userExist.id},
        {
          $set: {
            ...task
          }
        })
        return
    }

    await this.collection.insertOne({
      ...task
    })
  }

}