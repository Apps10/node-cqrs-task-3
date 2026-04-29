import { MongoClient, Db, Collection, Document } from "mongodb";
import { MONGO_URL_CONNECTION } from "../../bootstrap/Envs";
import { ILogger } from "../domain/Logger";

export class MongoDBClient {
  private client: MongoClient | null = null
  private db: Db | null = null
  private initialized = false

  constructor(private readonly logger: ILogger){}

  public async initialize(): Promise<void> {
    if(this.initialized) return

    try {
      this.client = new MongoClient(MONGO_URL_CONNECTION)
      await this.client.connect()
      this.db = this.client.db()
      this.initialized = true
      this.logger.info('mongodbConnection','✅ Connected to MongoDB for Read Operation')
    }catch(error){
       this.logger.error('mongodbConnection',`MongoDB not available, ${String(error)}`)
    }
  }
  

  public getCollection<T extends Document>(name: string): Collection<T> {
    if(this.db){
      return this.db.collection<T>(name)
    }

    throw new Error(`MongoDB not available`)
  }

  public async close(): Promise<void> {
    if(this.client){
      await this.client.close()
      this.logger.info('mongodbConnection','MongoDB connection closed')
    } 
  }
} 