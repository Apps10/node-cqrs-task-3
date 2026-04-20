import dotenv from "dotenv";
import * as zod from "zod";

dotenv.config()

const schema = zod.object({
  PORT_SERVER: zod.coerce.number(),
  RABBITMQ_HOST: zod.string(),
  RABBITMQ_USER: zod.string(),
  RABBITMQ_PASSWORD: zod.string(),
  MYSQL_USER: zod.string(),
  MYSQL_PASSWORD: zod.string(),
  MYSQL_HOSTNAME: zod.string(),
  MYSQL_DATABASE_NAME: zod.string(),
  MYSQL_PORT: zod.coerce.number(),
  MONGO_URL_CONNECTION: zod.string(),
  ELASTIC_URL_CONNECTION: zod.string(),
  ENVIRONMENT: zod.enum(['dev', 'prod' ])
})
 
type Env = zod.infer<typeof schema>;

class Envs {
  private envs: Env;
  private static envInstance: Envs
 
  private constructor() {
    const result = schema.safeParse(process.env)
    if(!result.success){
      throw new Error(zod.prettifyError(result.error))
    }
    this.envs = result.data
   
  }

  public static getInstance(){
    if(!this.envInstance){
      this.envInstance = new Envs() 
    }
    return this.envInstance
  }

  public getAll(){
    return this.envs
  }

  public get(key: keyof Env){
    return this.envs[key]
  }

}

const envs = Envs.getInstance().getAll()
export const  {
  PORT_SERVER,
  RABBITMQ_HOST,
  RABBITMQ_PASSWORD,
  RABBITMQ_USER,
  MYSQL_DATABASE_NAME,
  MYSQL_HOSTNAME,
  MYSQL_PASSWORD,
  MYSQL_USER,
  MYSQL_PORT,
  MONGO_URL_CONNECTION,
  ELASTIC_URL_CONNECTION,
  ENVIRONMENT
} = envs
