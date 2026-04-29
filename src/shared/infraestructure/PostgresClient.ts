import { Sequelize } from "sequelize";
import { MYSQL_DATABASE_NAME, MYSQL_HOSTNAME, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER } from "../../bootstrap/Envs";
import { ILogger } from "../domain/Logger";
import { ErrorMonitor } from "../domain/ErrorMonitor";


export class PostgresClient {
  dbClient: Sequelize
  
  constructor(
    private readonly logger: ILogger, 
    private readonly errorMonitor: ErrorMonitor
  ){
    this.dbClient = new Sequelize(MYSQL_DATABASE_NAME, MYSQL_USER, MYSQL_PASSWORD, {
      host: MYSQL_HOSTNAME,
      port: MYSQL_PORT,
      logging: false,
      dialect: "postgres"
    })
  }

  async initialize(){
    try{
      await this.dbClient.authenticate()
      this.logger.info('postgresConnection',`✅ Connection has been established successfully.`)
    }catch(err){
      this.errorMonitor.captureException(err)
      this.logger.error('postgresError',`💥 Unable to connect with PostgresDB`)
    }
  }
   
}